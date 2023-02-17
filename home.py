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
    # if form is being submitted from POST, get all the form information
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
        #injury type
        injuryType = [request.form.get('injury1', ''), 
        request.form.get('injury2', ''),
        request.form.get('injury3', ''),
        request.form.get('injury4', ''),
        request.form.get('injury5', ''),
        request.form.get('injury6', ''),
        request.form.get('injury7', ''),
        request.form.get('injury8', ''),
        request.form.get('injury9', ''),
        request.form.get('injury10', ''),
        request.form.get('injury11', ''),
        request.form.get('injury12', ''),
        request.form.get('injury13', '')]
        injuryZone = request.form['injury-zone']

        toJSON = [
            {'GDP of the year (in trillion USD)': gdp, 
            'Inflation Rate': inflationRate, 
            'Pandemic': pandemic, 
            'Month': month,
            'Average Age of province': avgAge,
            'Day of the week': dayOfWeek, 
            'Holiday': holiday, 
            'Time of Day': timeOfDay, 
            'Weather': weather, 
            'number of Health care facilities in a 50km radius': facilities,
            'Hospital Beds per 1000 people': bedsAvailable, 
            'Population Density /square km (Hospital Location Marker)': popDensity, 
            'Injury Type': injuryType,
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
    return render_template("help.html")


@app.route("/history.html", methods=['GET', 'POST'])
def history():
    print("rendering history")
    return render_template("history.html")


# running app
if __name__ == "__main__":
    app.run(debug=True)











# activeSeizure = request.form['injury1']
        # heartAttack = request.form['injury2']
        # minorCuts = request.form['injury3']
        # minorInjury = request.form['injury4']
        # drugOverdose = request.form['injury5']
        # cardiacArrest = request.form['injury6']
        # dislocation = request.form['injury7']
        # flu = request.form['injury8']
        # limbFracture = request.form['injury9']
        # mildBreathing = request.form['injury10']
        # severePain = request.form['injury11']
        # sprain = request.form['injury12']
        # stroke = request.form['injury13']


# 'Active Seizure': activeSeizure,
            # 'Heart Attack': heartAttack,
            # 'Minor Cuts': minorCuts,
            # 'Minor Injury': minorInjury,
            # 'Drug Overdose': drugOverdose,
            # 'Cardiac Arrest': cardiacArrest, 
            # 'Dislocation': dislocation,
            # 'Flu': flu,
            # 'Limb Fracture': limbFracture,
            # 'Mild Breathing difficulties': mildBreathing,
            # 'Severe Pain': severePain,
            # 'Sprain': sprain,
            # 'Stroke': stroke,