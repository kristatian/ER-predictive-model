from flask import Flask, flash, redirect, render_template, request, session, abort, url_for, jsonify, make_response,session
import requests
import json
from hashlib import sha256
import copy

# creates instance of Flask app
app = Flask(__name__, template_folder='templates', static_folder='staticFiles')

# change to actual address once hosting is done, this is for debugging only
baseUrl = 'http://127.0.0.1:5000/'

# valid weather mapping
validWeather = ['Foggy', 'Ice Snow', 'Rainy', 'Snowy', 'Windy']
injuryList = ['Stroke','Cardiac Arrest','Drug Overdose','Heart Attack','Active Seizure']

@app.route("/", methods=['GET', 'POST']) 
def appStart():
    return render_template("signup.html")

@app.route("/login", methods=['GET', 'POST'])
def login():
    if('username' in request.form):
        # call login function 
        response = requests.post(baseUrl+"/user/login",json={'username':request.form.get('username'),'password':sha256(request.form.get('psw').encode('utf-8')).hexdigest()},cookies={'session':request.cookies.get("session")})
        #response = requests.post(baseUrl+"/user/login",json={'username':request.form.get('username'),'password':sha256(request.form.get('psw').encode('utf-8')).hexdigest()})
        print(response.cookies) 
        print(response.content)
        # if return is success
        if('Success' in str(response.content)):
            # move to index.html and store username as cookie
            print('login success')
            resp = make_response(render_template("index.html", test = "", pred = "", displayResult = 'False'))
            #resp = make_response()
            resp.set_cookie('userID', request.form.get('username'))
            resp.set_cookie('session', response.cookies['session'])
            return resp
        else:
            return render_template("signup.html")


@app.route("/signup", methods=['GET', 'POST'])
def signin():
    # check if signin or login
    if ('fname' in request.form):
        # call sign in function and display signup page again
        print("signup")
        #/user/register
        response = requests.post(baseUrl+"/user/register",json={'username':request.form.get('fname'),'password':sha256(request.form.get('psw').encode('utf-8')).hexdigest()},cookies={'session':request.cookies.get("session")})
        #print(response.content)
        if('Success' in str(response.content)):
            print("Successful register")
        # if possible display a fail/success message...
    return render_template("signup.html")
 
@app.route("/logout", methods=['GET', 'POST'])
def logout():
    response = requests.get(baseUrl+"/user/logout",cookies={'session':request.cookies.get("session")})
    resp = make_response(render_template("signup.html"))
    resp.set_cookie('userID', '',expires=0)
    if (session in response.cookies):
        resp.set_cookie('session', response.cookies['session'])
    else:
        resp.set_cookie('session', '',expires=0)

    resp.set_cookie('scenarioId', '',expires=0)
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

        toJSON =  {'GDP of the year (in trillion USD)': gdp, 
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

        sentJson = copy.deepcopy(toJSON)
        # quick json pre-processing 
        if(not weather in validWeather):
            del toJSON[weather]
  
        if ('None' in holiday):
            del toJSON[holiday]

        if('Early Afternoon' in timeOfDay):
            del toJSON[timeOfDay]

        if('Abdominal Pain' in injuryType):
            del toJSON[injuryType]
        
        if (injuryType in injuryList):
            toJSON['Injury Zone'] = "Red"

        print(toJSON)

        scenarioId = request.cookies.get("scenarioId")
        userName = request.cookies.get("userID")

        predictionName = request.form['sname']
        #headers = {'scenario_id': scenarioId,'username':userName}
        headers = {'username':userName, 'prediction_name':predictionName, 'scenario_id': scenarioId}
 
        print(toJSON) 
        # run api call to backend api
        response = requests.post(baseUrl+"/predict",json=toJSON,headers=headers,cookies={'session':request.cookies.get("session")})
        stringPrediction = response.content.decode("utf-8")
        print(stringPrediction)
        return render_template("index.html", test = sentJson, pred = stringPrediction, displayResult = 'True')
    else:
        # check if session exists
        if(request.cookies.get("session") is None):
            return render_template("signup.html")
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

# Create new what if scenario
# backend endpoint = /scenario/store-scenario
@app.route("/whatIfCreate", methods=['POST'])
def createScenario():

    inputs = json.loads(request.get_json().get("inputs"))
    userName = request.cookies.get("userID")

    scenarioName = inputs['sname']
    headers = {'username':userName, 'scenario_name':scenarioName}

    gdp = inputs['gdp-year']
    inflationRate = inputs['inflation-rate']
    pandemic = inputs['pandemic-ans']
    month = inputs['month']
    avgAge = inputs['average-age']
    dayOfWeek = inputs['day-of-wk']
    holiday = inputs['holiday']
    timeOfDay = inputs['time']
    weather = inputs['weather']
    facilities = inputs['num-facilities']
    bedsAvailable = inputs['beds-avail']
    popDensity = inputs['pop-density']
    injuryType = inputs['injury-type-ans']
    injuryZone = inputs['injury-zone']
    
    toSend =  {'GDP of the year (in trillion USD)': gdp, 
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

    print(toSend)

    sentJson = copy.deepcopy(toSend)
    
    # quick json pre-processing 
    if(not weather in validWeather):
        del toSend[weather]

    if ('None' in holiday):
        del toSend[holiday]

    if('Early Afternoon' in timeOfDay):
        del toSend[timeOfDay]

    if('Abdominal Pain' in injuryType):
        del toSend[injuryType]

    if (injuryType in injuryList):
        toSend['Injury Zone'] = "Red"

    requests.post(baseUrl+"/scenario/store-scenario",json=toSend,headers=headers,cookies={'session':request.cookies.get("session")})

    return render_template("index.html")

# get all user what if scenarios
# backend endpoint = /scenario/get-scenarios
@app.route("/whatIfGet", methods=['GET'])
def getScenario():
    responseScenario = requests.get(baseUrl+"/scenario/get-scenarios",cookies={'session':request.cookies.get("session")})
    responsePrediction = requests.get(baseUrl+"/history/get-history",cookies={'session':request.cookies.get("session")})
    test = "[" + responseScenario.content.decode("utf-8") + "," + responsePrediction.content.decode("utf-8") + "]";
    return test

# get user prediction history
# backend endpoint = /history/get-history
@app.route("/getHistory", methods=['GET'])
def getHistory():
    response = requests.get(baseUrl+"/history/get-history",cookies={'session':request.cookies.get("session")})
    print(response.content.decode("utf-8"))
    return response.content.decode("utf-8")

@app.route("/deletePrediction", methods=['DELETE'])
def deletePrediction():
    userName = request.cookies.get("userID")
    prediction_id = request.get_data("requestID")
    headers = {'username':userName, 'prediction_id':prediction_id}
    response = requests.delete(baseUrl+"/history/remove-prediction",headers=headers,cookies={'session':request.cookies.get("session")})
    print(response.content.decode("utf-8"))
    return response.content.decode("utf-8")

@app.route("/deleteScenario", methods=['DELETE'])
def deleteScenario():
    userName = request.cookies.get("userID")
    scenario_id = request.get_data("scenarioID")
    headers = {'username':userName, 'scenario_id':scenario_id}
    response = requests.delete(baseUrl+"/scenario/remove-scenario",headers=headers,cookies={'session':request.cookies.get("session")})
    print(response.content.decode("utf-8"))
    return response.content.decode("utf-8")

@app.route("/info.html")
def info():
    return render_template("info.html")


@app.route("/help.html")
def help():
    return render_template("help.html")


@app.route("/history.html", methods=['GET', 'POST'])
def history():
    return render_template("history.html")


# running app
if __name__ == "__main__":
    app.run(debug=True,port=5002)