from flask import Flask, flash, redirect, render_template, request, session, abort, url_for, jsonify
import json

# creates instance of Flask app
app = Flask(__name__, template_folder='templates', static_folder='staticFiles')

# @app.route("/api/data", methods=['GET', 'POST'])
# def get_form():
    
#     return render_template("index.html")

@app.route("/index.html", methods=['GET', 'POST'])
def home():
    # if form is being submitted from POST, get all the form information
    if request.method == 'POST':
        gdp = request.form['gdp-year']
        inflationRate = request.form['inflation-rate']
        pandemic = request.form['pandemic-ans']
        month = request.form['month']
        dayOfWeek = request.form['day-of-wk']
        holiday = request.form['holiday']
        timeOfDay = request.form['time']
        weather = request.form['weather']
        bedsAvailable = request.form['beds-avail']
        popDensity = request.form['pop-density']
        #injury type missing
        injuryZone = request.form['injury-zone']

        toJSON = [
            {'gdp': gdp, 'inflationRate': inflationRate, 'pandemic': pandemic, 'month': month,
            'dayOfWeek': dayOfWeek, 'holiday': holiday, 'timeOfDay': timeOfDay, 'weather': weather, 
            'bedsAvailable': bedsAvailable, 'popDensity': popDensity, 'injuryZone': injuryZone}
        ]

        return render_template("index.html", test = toJSON )

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
    return render_template("help.html")


@app.route("/history.html")
def history():
    return render_template("history.html")


# running app
if __name__ == "__main__":
    app.run(debug=True)
