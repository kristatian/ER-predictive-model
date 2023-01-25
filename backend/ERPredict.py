import server

##Prediction Generation
def generate_prediction(username, input_vars):
    user_id = server.retrieve_user_id(username)
    if (user_id is None):
        return "User Id does not exist"
    ##send input_vars to model
    ##receive prediction from model
    server.store_prediction(user_id, input_vars, prediction)
    return prediction

##User
def create_user(doc):
    user_exists = server.check_if_username_exists(doc["username"])
    print (user_exists)
    if (user_exists == 1):
        return "Username is Taken"
    server.create_user(doc["username"], doc["password"])
    return "Success"

def verify_user(doc):
    user_exists = server.check_if_username_exists(doc["username"])
    if (user_exists != 1):
        return "User Does Not Exist"
    ##Perform user validation here
    return "Success"

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
def store_scenarios(username, input_vars):
    user_id = server.retrieve_user_id(username)
    if (user_id is None):
        return "User Id does not exist"
    print(user_id)
    server.store_scenario(user_id, input_vars)
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
