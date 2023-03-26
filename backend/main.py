from flask import Flask, request, session
from flask_login import LoginManager
import ERPredict

app = Flask(__name__)
app.secret_key = "wetestingouthere"
login_manager = LoginManager()
login_manager.init_app(app)

##Prediction Generation Function
@app.route('/predict', methods=['POST'])
def generate_prediction():
    if 'loggedin' in session:
        username = request.headers.get('username')
        scenario_id = request.headers.get('scenario_id')
        prediction_name = request.headers.get('prediction_name')
        #model = request.headers.get('model')
        request_body = request.get_json()
        return ERPredict.generate_prediction(username, request_body,scenario_id, prediction_name) #return everything
    return "Not Logged in"

#User
@app.route('/user/register', methods=['GET', 'POST'])
def create_user():
    request_body = request.get_json()
    print(request_body)
    return ERPredict.create_user(request_body)

##Login
@app.route('/user/login', methods=['GET', 'POST'])
def login():
    if 'loggedin' not in session:
        if request.method == 'POST':
            request_body = request.get_json()
        return ERPredict.verify_user(request_body)
    return "Already Logged In"

##Logout
@app.route('/user/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    return "Success"

#Prediction History
@app.route('/history/get-history', methods=['GET']) ##Verified
def retrieve_history():
    if 'loggedin' in session:
        username = session['username']
        return ERPredict.retrieve_history(username)
    return "Not Logged in"

@app.route('/history/remove-prediction', methods=['DELETE']) ##Verified
def delete_prediction():
    if 'loggedin' in session:
        username = session['username']
        prediction_id = request.headers.get('prediction-id')
        return ERPredict.delete_prediction(username, prediction_id)
    return "Not Logged in"

#What-If Scenarios
@app.route('/scenario/get-scenarios', methods=['GET']) ##Verified
def retrieve_scenarios():
    if 'loggedin' in session:
        username = session['username']
        return ERPredict.retrieve_scenarios(username)
    return "Not Logged in"

@app.route('/scenario/store-scenario', methods=['POST']) ##Verified
def store_scenarios():
    if 'loggedin' in session:
        username = session['username']
        scenario_name = request.headers.get('scenario_name')
        request_body = request.get_json()
        return ERPredict.store_scenarios(username, request_body, scenario_name)
    return "Not Logged in"

@app.route('/scenario/remove-scenario', methods=['DELETE']) ##Verified
def remove_scenario():
    if 'loggedin' in session:
        username = session['username']
        scenario_id = request.headers.get('scenario_id')
        return ERPredict.remove_scenario(username, scenario_id)
    return "Not Logged in"

@app.route('/scenario/update-scenario', methods=['PATCH']) ##Verified
def update_scenario():
    if 'loggedin' in session:
        username = session['username']
        scenario_id = request.headers.get('scenario_id')
        request_body = request.get_json()
        print(request_body)
        return ERPredict.update_scenario(username, scenario_id, request_body)
    return "Not Logged in"

if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, host="0.0.0.0")