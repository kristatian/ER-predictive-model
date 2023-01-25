import mysql.connector as mysql
import uuid
from datetime import datetime
import functools
import operator
import json


#print(db)

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
    values = (str(uuid.uuid4()), username, passw)
    cursor.execute(sql, values) #make global
    db.commit()

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
def store_prediction(user_id, input_vars, prediction):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    sql = "INSERT INTO prediction_history (request_id, user_id, input_vars, prediction, date_time) VALUES (%s, %s, %s, %s, %s)"
    values = (str(uuid.uuid4()), user_id, input_vars, prediction, timestamp)
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

def retrieve_history(user_id):
    sql = "SELECT * FROM prediction_history WHERE user_id = '%s'" % (user_id)
    cursor.execute(sql) #make global
    result = cursor.fetchall()
    return result


#What-If Scenario Functions
def store_scenario(user_id, input_vars):
    input_vars = json.dumps(input_vars)
    sql = "INSERT INTO what_if_scenario (scenario_id, user_id, input_vars) VALUES (%s, %s, %s)"
    values = (str(uuid.uuid4()), user_id, input_vars)
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
    sql = "DELETE FROM what_if_scenario WHERE user_id = %s AND scenario_id = %s"
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


