from flask import Flask, flash, redirect, render_template, request, session, abort, url_for, jsonify
import json

# creates instance of Flask app
app = Flask(__name__, template_folder='templates', static_folder='staticFiles')

data_string = '''
{
    "prediction": "40",
    "date": "Jan 24, 2023",
    "time": "12:23:45 AM EST"
}
'''

data = json.loads(data_string)
print(data['prediction'])

@app.route("/")
def signin():
    return render_template("signup.html")

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
            'Weather': weather, 
            'number of Health care facilities in a 50km radius': facilities,
            'Hospital Beds per 1000 people': bedsAvailable, 
            'Population Density /square km (Hospital Location Marker)': popDensity, 
            injuryType: 1,
            'Injury Zone': injuryZone}
        ]

        return render_template("index.html", test = toJSON, pred = data['prediction'])

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
    app.run(debug=True)
