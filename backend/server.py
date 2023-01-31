import mysql.connector as mysql
import uuid
from datetime import datetime
import functools
import operator
import json

db = mysql.connect(
    host = "localhost",
    user = "our_info_here",
    passwd = "your_info_here",
    database = "erDB"
)
cursor = db.cursor()

##User Table Functions
def create_user(username, passw):
    sql = "INSERT INTO user (user_id, username, pass) VALUES (%s, %s, %s)"
    user_id = str(uuid.uuid4())
    values = (user_id, username, passw)
    cursor.execute(sql, values) #make global
    db.commit()
    result = user_id
    return result

#Retrieves User_ID for Other Table Identification Used Internally
def retrieve_user_id(username):
    sql = "SELECT user_id FROM user WHERE username = '%s'" % (username)
    cursor.execute(sql) #make global
    result = cursor.fetchone()
    if result is not None:
        result = functools.reduce(operator.add, result)
    return result

#Checks if the username already exists
def check_if_username_exists(username):
    sql = "SELECT COUNT(1) FROM user WHERE username = '%s'" % (username) #Better way to check if exists
    cursor.execute(sql) #make global
    return cursor.fetchone()[0] #Returns 1 if exists otherwise 0
      

#Prediction History Functions
def store_prediction(user_id, input_vars, prediction, scenario_version_number):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    sql = "INSERT INTO prediction_history (request_id, user_id, input_vars, prediction, date_time) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (str(uuid.uuid4()), user_id, input_vars, prediction, timestamp, scenario_version_number)
    cursor.execute(sql, values) #make global
    db.commit()

def delete_prediction(user_id, prediction_id):
    sql = "DELETE FROM prediction_history WHERE user_id = %s AND request_id = %s"
    values = (user_id, prediction_id)
    cursor.execute(sql, values)
    db.commit()
    print(cursor.rowcount, "record(s) affected") 

def delete_all_predictions(user_id):
    sql = "DELETE FROM prediction_history WHERE user_id = '%s'" % (user_id)
    cursor.execute(sql) #make global
    db.commit()
    print(cursor.rowcount, "record(s) affected") 

def retrieve_history(user_id): #THIS NEEDS WORK TO RETURN JSON STUFF PROPERLY
    sql = "SELECT what_if_scenario_history.version_number, what_if_scenario_history.scenario_id, prediction.request_id, prediction.input_vars, prediction.prediction, prediction.date_time, what_if_scenario_history.scenario_name \
    FROM prediction, what_if_scenario_history \
    WHERE prediction.user_id = what_if_scenario_history.user_id AND prediction.user_id = '%s' AND what_if_scenario_history.version_number = prediction.scenario_version_number \
    AND prediction.scenario_id = what_if_scenario_history.scenario_id" % (user_id)
    cursor = db.cursor(dictionary=True)
    cursor.execute(sql) #make global
    result = cursor.fetchall()
    cursor = db.cursor(dictionary=False)
    return result


#What-If Scenario Functions
def store_scenario(user_id, input_vars, name):
    print(str(user_id))
    input_vars = json.dumps(input_vars)
    sql = "INSERT INTO what_if_scenario (scenario_id, user_id, input_vars, scenario_name) VALUES (%s, %s, %s, %s)"
    values = (str(uuid.uuid4()), user_id, input_vars, name)
    cursor.execute(sql, values) #make global
    db.commit()

def update_scenario(user_id, scenario_id, input_vars):
    input_vars = json.dumps(input_vars)
    sql = "UPDATE what_if_scenario SET input_vars = %s WHERE user_id = %s AND scenario_id = %s"
    values = (input_vars, user_id, scenario_id)
    cursor.execute(sql, values) #make global
    db.commit()
    print(cursor.rowcount, "record(s) affected") 

def delete_scenario(user_id, scenario_id):
    print(user_id)
    print(scenario_id)
    sql = "UPDATE what_if_scenario SET archived = true WHERE user_id = %s AND scenario_id = %s" ##Soft Delete
    values = (user_id, scenario_id)
    cursor.execute(sql, values) #make global
    db.commit()
    print(cursor.rowcount, "record(s) affected") 

def retrieve_scenarios(user_id):
    sql = "SELECT * FROM what_if_scenario WHERE user_id = '%s'" % (user_id)
    cursor.execute(sql) #make global
    result = cursor.fetchall()
    print(result)
    return result

def retrieve_current_scenario_number(user_id, scenario_id):
    sql = "SELECT MAX(version_number) FROM what_if_scenario_history WHERE user_id = %s AND scenario_id = %s"
    values = (user_id, scenario_id)
    result = cursor.execute(sql, values) #make global
    return result

def retrieve_default_scenario_id(user_id):
    sql = "SELECT scenario_id FROM what_if_scenario WHERE user_id = %s AND scenario_name = default" % (user_id)
    result = cursor.execute(sql) #make global
    return result




