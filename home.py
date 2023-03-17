from flask import Flask, flash, redirect, render_template, request, session, abort, url_for, jsonify, make_response,session
import requests
import json
from hashlib import sha256

# creates instance of Flask app
app = Flask(__name__, template_folder='templates', static_folder='staticFiles')
app.secret_key = "wetestingouthere"
data_string = '''
{
    "prediction": "40",
    "date": "Jan 24, 2023",
    "time": "12:23:45 AM EST"
}
'''  
session = requests.Session()
data = json.loads(data_string)
print(data['prediction']) 

# change to actual address once hosting is done, this is for debugging only
baseUrl = 'http://127.0.0.1:5000/'

@app.route("/", methods=['GET', 'POST']) 
def appStart():
    return render_template("signup.html")

@app.route("/login", methods=['GET', 'POST'])
def login():
    #session['loggedin'] = True
    #print("Session = ")
    #print(session)
    if('username' in request.form):
        # call login function 
        response = session.post(baseUrl+"/user/login",json={'username':request.form.get('username'),'password':sha256(request.form.get('psw').encode('utf-8')).hexdigest()})
        #response = requests.post(baseUrl+"/user/login",json={'username':request.form.get('username'),'password':sha256(request.form.get('psw').encode('utf-8')).hexdigest()})
        print(response.cookies) 
        # if return is success
        if('Success' in str(response.content)):
            # move to index.html and store username as cookie
            print('login success')
            resp = make_response(render_template("index.html"))
            #resp = make_response()
            resp.set_cookie('userID', request.form.get('username'))
            return resp
        else:
            return render_template("signup.html")


@app.route("/signup", methods=['GET', 'POST'])
def signin():
    #print("Session = ")
    #print(session)
    # check if signin or login
    if ('fname' in request.form):
        # call sign in function and display signup page again
        print("signup") 
        #/user/register
        response = session.post(baseUrl+"/user/register",json={'username':request.form.get('fname'),'password':sha256(request.form.get('psw').encode('utf-8')).hexdigest()})
        #print(response.content)
        if('Success' in str(response.content)):
            print("Successful register")
        # if possible display a fail/success message...
    return render_template("signup.html")

@app.route("/logout", methods=['GET', 'POST'])
def logout():
    response = session.get(baseUrl+"/user/logout")
    resp = make_response(render_template("signup.html"))
    resp.set_cookie('userID', '')
    print("return to signup.html")
    
    return resp

@app.route("/index.html", methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        gdp = request.form['gdp-year']
        inflationRate = request.form['inflation-rate']
        pandemic = request.form['pandemic-ans']
        month = request.form['month']
        avgAge = request.form['average-age']
        dayOfWeek = request.form['day-of-wk']
        holiday = request.form['holiday']
        timeOfDay = request.form['time']
        weather = request.form['weather']
        facilities = request.form['num-facilities']
        bedsAvailable = request.form['beds-avail']
        popDensity = request.form['pop-density']
        injuryType = request.form['injury-type-ans']
        injuryZone = request.form['injury-zone']

        toJSON = [
            {'GDP of the year (in trillion USD)': gdp, 
            'Inflation Rate': inflationRate, 
            'Pandemic': pandemic, 
            'Month': month,
            'Average Age of province': avgAge,
            'Day of the week': dayOfWeek, 
            holiday: 1, 
            timeOfDay: 1, 
            weather: 1, 
            'number of Health care facilities in a 50km radius': facilities,
            'Hospital Beds per 1000 people': bedsAvailable, 
            'Population Density /square km (Hospital Location Marker)': popDensity, 
            injuryType: 1,
            'Injury Zone': injuryZone}
        ]
        scenarioId = request.cookies.get("scenarioId")
        userName = request.cookies.get("userID")
        #headers = {'scenario_id': scenarioId,'username':userName}
        headers = {'username':userName}

        print(toJSON)
        # run api call to backend api
        response = session.post(baseUrl+"/predict",json=toJSON[0],headers=headers)
        stringPrediction = response.content.decode("utf-8")
        print(stringPrediction)
        return render_template("index.html", test = toJSON, pred = stringPrediction)

    return render_template("index.html")

@app.route("/api", methods=['GET', 'POST'])
def getJSON():

    data = request.get_json()
    userID = data['userID']
    predictionResults = data['predResults']
    date = data['genDate']
    time = data['genTime'] 

    predResult = [
        {'userID' : userID, 'predictionResults' : predictionResults, 'date' : date, 'time' : time}
    ]

    return predResult

@app.route("/info.html")
def info():
    return render_template("info.html")


@app.route("/help.html")
def help():
    return render_template("login.html")


@app.route("/history.html", methods=['GET', 'POST'])
def history():
    return render_template("history.html")


# running app
if __name__ == "__main__":
    app.run(debug=True,port=5002)
 