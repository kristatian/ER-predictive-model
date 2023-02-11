import json
import server
import runModel
from flask import session
import runModel

##Prediction Generation
def generate_prediction(username, input_vars, model=1, scenario_id = None):
    user_id = server.retrieve_user_id(username)
    if (user_id is None):
        return "User Id does not exist"

    ##send input_vars to model
    prediction = runModel.runModel(input_vars,model=model)

    ##receive prediction from model
    if scenario_id is None:
        scenario_id = server.retrieve_default_scenario_id

    scenario_number = server.retrieve_current_scenario_number(user_id, scenario_id)
    server.store_prediction(user_id, input_vars, prediction, scenario_number)
    return str(prediction)

##User
def create_user(doc):
    user_exists = server.check_if_username_exists(doc["username"])
    print (user_exists)
    if (user_exists == 1):
        return "Username is Taken"
    user_id = server.create_user(doc["username"], doc["password"])
    print(user_id)
    server.store_scenario(user_id, json.loads('{}'), "default")
    return "Success"

def verify_user(doc):
    user_exists = server.check_if_username_exists(doc["username"])
    if (user_exists != 1):
        return "User Does Not Exist"
    user = server.verify_user_creds(doc["username"], doc["password"])
    if user:
            session['loggedin'] = True
            session['id'] = user['user_id']
            session['username'] = user['username']
            return 'Success'
    return "Failure"

##Prediction History
def retrieve_history(username):
    user_id = server.retrieve_user_id(username)
    print(user_id)
    history = server.retrieve_history(user_id)
    print('Success')
    return history

def delete_prediction(username, prediction_id):
    user_id = server.retrieve_user_id(username)
    server.delete_prediction(user_id, prediction_id)
    return 'Success'

##What-If Scenarios
def store_scenarios(username, input_vars, name):
    user_id = server.retrieve_user_id(username)
    if (user_id is None):
        return "User Id does not exist"
    print(user_id)
    server.store_scenario(user_id, input_vars, name)
    return 'Success'

def retrieve_scenarios(username):
    user_id = server.retrieve_user_id(username)
    print(user_id)
    scenarios = server.retrieve_scenarios(user_id)
    return scenarios

def remove_scenarios(username, scenario_id):
    user_id = server.retrieve_user_id(username)
    if (user_id is None):
        return "User Id does not exist"
    server.delete_scenario(user_id, scenario_id)
    return 'Success'

def update_scenario(username, scenario_id, input_vars):
    user_id = server.retrieve_user_id(username)
    if (user_id is None):
        return "User Id does not exist"
    server.update_scenario(user_id, scenario_id, input_vars)
    return 'Success'
