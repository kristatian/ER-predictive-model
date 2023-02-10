from flask import Flask, request
import ERPredict

app = Flask(__name__)

##Prediction Generation Function
@app.route('/predict', methods=['POST'])
def genereate_prediction():
    username = request.headers.get('username')
    #model = request.headers.get('model')
    request_body = request.get_json()
    return ERPredict.generate_prediction(username, request_body) #return everything

#User
@app.route('/user/create-user', methods=['POST']) ##Verified
def create_user():
    request_body = request.get_json()
    print(request_body)
    return ERPredict.create_user(request_body)

##Needs Authentication
@app.route('/user/verify-user', methods=['POST'])
def verify_user():
    request_body = request.get_json()
    return ERPredict.create_user(request_body)


#Prediction History
@app.route('/history/get-history', methods=['GET']) ##Verified
def retrieve_history():
    username = request.headers.get('username')
    return ERPredict.retrieve_history(username)

@app.route('/history/remove-prediction', methods=['DELETE']) ##Verified
def delete_prediction():
    username = request.headers.get('username')
    prediction_id = request.headers.get('prediction-id')
    return ERPredict.delete_prediction(username, prediction_id)

#What-If Scenarios
@app.route('/scenario/get-scenario', methods=['GET']) ##Verified
def retrieve_scenarios():
    username = request.headers.get('username')
    return ERPredict.retrieve_scenarios(username)

@app.route('/scenario/store-scenario', methods=['POST']) ##Verified
def store_scenarios():
    username = request.headers.get('username')
    request_body = request.get_json()
    return ERPredict.store_scenarios(username, request_body)

@app.route('/scenario/remove-scenario', methods=['DELETE']) ##Verified
def remove_scenarios():
    username = request.headers.get('username')
    scenario_id = request.headers.get('scenario_id')
    return ERPredict.remove_scenarios(username, scenario_id)

@app.route('/scenario/update-scenario', methods=['PATCH']) ##Verified
def update_scenario():
    username = request.headers.get('username')
    scenario_id = request.headers.get('scenario_id')
    request_body = request.get_json()
    print(request_body)
    return ERPredict.update_scenario(username, scenario_id, request_body)

if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=8000)