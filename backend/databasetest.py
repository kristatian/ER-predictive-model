import mysql.connector as mysql
import server

db = mysql.connect(
    host = "localhost",
    user = "root",
    passwd = "rootmodel",
    database = "erDB"
)
cursor = db.cursor()

def drop_db():
    sql = "DROP TABLE prediction"
    cursor.execute(sql)
    sql = "DROP TABLE what_if_scenario_history"
    cursor.execute(sql)
    sql = "DROP TABLE what_if_scenario"
    cursor.execute(sql)
    sql = "DROP TABLE user"
    cursor.execute(sql)
    db.commit()

def clear_db():
    sql = "DELETE FROM prediction"
    cursor.execute(sql)
    sql = "DELETE FROM what_if_scenario_history"
    cursor.execute(sql)
    sql = "DELETE FROM what_if_scenario"
    cursor.execute(sql)
    sql = "DELETE FROM user"
    cursor.execute(sql)
    db.commit()

def populate_db():
    #Users
    data = [
            ('9109cb85-b090-4930-ba35-3c288c7de6e2','user1','user123'),
            ('c409c855-1a7c-4e57-baa1-fa1cf60e94ee', 'user2','user123'),
            ('aa38a112-f563-4e19-b24f-fb85233c6282', 'user3','user123')
            ]
    sql = "INSERT INTO user (user_id, username, pass) VALUES (%s, %s, %s)"
    cursor.executemany(sql, data)
    db.commit()

    #Whatif
    data = [
            ('e01d1a89-22be-46f5-a373-6019f797c6b6','9109cb85-b090-4930-ba35-3c288c7de6e2','{"name":"John", "age":30, "car":null}', 'scen1'),
            ('e46cd225-867a-4af8-9e6b-4373b0a836df', '9109cb85-b090-4930-ba35-3c288c7de6e2','{"name":"John", "age":30, "car":null}', 'scen2'),
            ('c409c855-1a7c-4e57-baa1-fa1cf60e94ee', '9109cb85-b090-4930-ba35-3c288c7de6e2','{"name":"John", "age":30, "car":null}', 'scen3')
            ]
    sql = "INSERT INTO what_if_scenario (scenario_id, user_id, input_vars, scenario_name) VALUES (%s, %s, %s, %s)"
    cursor.executemany(sql, data)
    db.commit()

    #Prediction Data
    data = [
            ('fcede0ad-0f7d-4713-a5ee-25176c0555a6','9109cb85-b090-4930-ba35-3c288c7de6e2','{"name":"John", "age":30, "car":null}', '1', '2023-01-26T20:58:28+00:00', 1),
            ('dedbfcff-15e0-460e-8262-18b111d3b804', '9109cb85-b090-4930-ba35-3c288c7de6e2','{"name":"John", "age":30, "car":null}', '2', '2023-01-26T20:58:28+00:00', 2),
            ('7ab6d41f-53ee-4e54-8ea3-544149bac860', '9109cb85-b090-4930-ba35-3c288c7de6e2','{"name":"John", "age":30, "car":null}', '3', '2023-01-26T20:58:28+00:00', 2)
            ]
    sql = "INSERT INTO prediction (request_id, user_id, input_vars, prediction, date_time) VALUES (%s, %s, %s, %s, %s, %i)"
    cursor.executemany(sql, data)
    db.commit()


""" input_vars = '{"name":"bob", "poor":yes"}'
user_id = "9109cb85-b090-4930-ba35-3c288c7de6e2"
scenario_id = "c409c855-1a7c-4e57-baa1-fa1cf60e94ee"
sql = "UPDATE what_if_scenario SET input_vars = %s WHERE user_id = %s AND scenario_id = %s"
values = (input_vars, user_id, scenario_id) """

drop_db()

""" data = [
            ('fcede0ad-0f7d-4713-a5ee-25176c0555a6','9109cb85-b090-4930-ba35-3c288c7de6e2','{"name":"John", "age":30, "car":null}', '1', '2023-01-26T20:58:28+00:00', 1, 'c409c855-1a7c-4e57-baa1-fa1cf60e94ee'),
            ('dedbfcff-15e0-460e-8262-18b111d3b804', '9109cb85-b090-4930-ba35-3c288c7de6e2','{"name":"John", "age":30, "car":null}', '2', '2023-01-26T20:58:28+00:00', 2, 'c409c855-1a7c-4e57-baa1-fa1cf60e94ee'),
            ('7ab6d41f-53ee-4e54-8ea3-544149bac860', '9109cb85-b090-4930-ba35-3c288c7de6e2','{"name":"John", "age":30, "car":null}', '3', '2023-01-26T20:58:28+00:00', 2, 'c409c855-1a7c-4e57-baa1-fa1cf60e94ee')
            ]
sql = "INSERT INTO prediction (request_id, user_id, input_vars, prediction, date_time, scenario_version_number, scenario_id) VALUES (%s, %s, %s, %s, %s, %s, %s)"
cursor.executemany(sql, data)
db.commit() """


#drop_db()
#clear_db()
#populate_db()

"""
result = server.retrieve_history("9109cb85-b090-4930-ba35-3c288c7de6e2")
print(result, end='\n')

result = server.retrieve_scenarios("9109cb85-b090-4930-ba35-3c288c7de6e2")
print(result, end='\n') """
