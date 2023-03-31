const text1 = '{"gdp-year": "1.45", "inflation-rate": "4.9", "pandemic-ans": "No", "month": "December", "average-age": "55", "day-of-wk": "Monday", "Christmas Day" : "1", "Past Midnight" : "1", "weather": "Sunny", "num-facilities": "2","beds-avail": "23", "pop-density": "34", "Minor Injury" : "1" ,"injury-zone": "Red"}';
const text2 = '{"gdp-year": "1", "inflation-rate": "8", "pandemic-ans": "Yes", "month": "August", "average-age": "23", "day-of-wk": "Tuesday", "Halloween" : "1", "Early Evening" : "1", "weather": "Rainy", "num-facilities": "3","beds-avail": "21", "pop-density": "645", "Severe Pain" : "1", "injury-zone": "Green"}';
const text3 = '{"gdp-year": "5", "inflation-rate": "1", "pandemic-ans": "No", "month": "January", "average-age": "65", "day-of-wk": "Wednesday", "Easter Sunday" : "1", "Late Afternoon" : "1", "weather": "Snowy", "num-facilities": "6","beds-avail": "5", "pop-density": "243", "Cardiac Arrest" : "1", "injury-zone": "Yellow"}';
const text4 = '{"gdp-year": "3", "inflation-rate": "7.45", "pandemic-ans": "Yes", "month": "January", "average-age": "33", "day-of-wk": "Thursday", "New Year\'s Day" : "1", "Late Evening" : "1", "weather": "Foggy", "num-facilities": "9","beds-avail": "4", "pop-density": "36344", "Flu" : "1", "injury-zone": "Red"}';
const text5 = '{"gdp-year": "0.5", "inflation-rate": "0.5", "pandemic-ans": "Yes", "month": "September", "average-age": "90", "day-of-wk": "Friday", "None" : "1", "Past Midnight" : "1", "weather": "Rainy", "num-facilities": "1","beds-avail": "7", "pop-density": "7", "Drug Overdose" : "1", "injury-zone": "Green"}';


function setScenario(scenario, scenarioId) {
  if (localStorage.getItem("scenario") == null) {
    localStorage.setItem("scenario", "{}");
  }
  localStorage.setItem("scenario", scenario);

  document.cookie = "scenarioId=" + scenarioId;
  loadText();
}

function loadText() {
    if (localStorage.getItem("scenario") == null) {
      localStorage.setItem("scenario", "{}");
    }
    
    text = localStorage.getItem("scenario");
    const myArr = JSON.parse(text);

    keysArr = [];
    for (key in myArr) {
      keysArr.push(key);
    }
    
    if (!(Object.keys(myArr).length === 0)) {

      const hol = document.getElementById('holiday');
      const timeOfDay = document.getElementById('time');
      const weather = document.getElementById('weather');

      holList = ["Christmas Day", "New Year's Eve", "New Year's Day", "Black Friday", "Labor Day", "Easter Sunday", "Halloween", "Canada Day", "Thanksgiving", "Victoria Day", "Valentine's Day", "Super bowl", "St. Patrick's Day"];
      timeList = ["Early Morning", "Early Afternoon", "Early Evening", "Late Morning", "Late Afternoon", "Late Evening", "Past Midnight"];
      injuryList = ["Active Seizure", "Heart Attack", "Minor Cuts", "Minor Injury", "Drug Overdose", "Cardiac Arrest", "Dislocation", "Flu", "Limb Fracture", "Mild Breathing Difficulties", "Severe Pain", "Sprain", "Abdominal Pain", "Stroke"];
      weatherList = ["Sunny", "Foggy", "Ice Snow", "Rainy", "Snowy", "Windy"];

      keysArr.forEach(key => {
        if (holList.includes(key)) {
          hol.value = key;
        }

        if (timeList.includes(key)) {
          timeOfDay.value = key;
        }

        if (weatherList.includes(key)) {
          weather.value = key;
        }

        if (injuryList.includes(key)) {
          const injuryType = document.getElementById(key.toLowerCase().replace(" ", "-"));
          injuryType.checked = true;
        }
      })

      const gdp = document.getElementById('gdp-year');
      gdp.value = myArr["GDP of the year (in trillion USD)"];

      const inf = document.getElementById('inflation-rate');
      inf.value = myArr["Inflation Rate"];

      const panedmicY = document.getElementById('pandemic-yes');
      const panedmicN = document.getElementById('pandemic-no');

      if (myArr["Pandemic"] == 'Yes') {
        panedmicY.checked = true;
      } else {
        panedmicN.checked = true;
      }

      const month = document.getElementById('month');
      month.value = myArr["Month"];

      const avgAge = document.getElementById('average-age');
      avgAge.value = myArr["Average Age of province"];

      const day = document.getElementById('day-of-wk');
      day.value = myArr["Day of the week"];

      const facilities = document.getElementById('num-facilities');
      facilities.value = myArr["number of Health care facilities in a 50km radius"];

      const beds = document.getElementById('beds-avail');
      beds.value = myArr["Hospital Beds per 1000 people"];

      const popDensity = document.getElementById('pop-density');
      popDensity.value = myArr["Population Density /square km (Hospital Location Marker)"];

      const zone = document.getElementById('injury-zone');
      zone.value = myArr["Injury Zone"];
      
      localStorage.setItem("scenario", "{}");
      //location.reload();
    }
}


document.getElementById('saveResults').addEventListener('click', function(e) {
  if (localStorage.getItem("scenarios") == null) {
    localStorage.setItem("scenarios", "[]");
  }
  var scenario_list = JSON.parse(localStorage.getItem("scenarios"));

  const form = new FormData(document.getElementById('prediction-form'));
  var object = {};
  form.forEach(function(value, key){
    if (key == 'time' || key == 'holiday' || key == 'injury-type-ans') {
      object[value] = 1;
    } else {
      object[key] = value;
    } 
  });
  var json = JSON.stringify(object);
  
  scenario_list.push(json);
  scenario_list = [...new Set(scenario_list)];

  localStorage.setItem("scenarios", JSON.stringify(scenario_list));
})

function loadHistory(scenarioId) {
  var xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var historyList = document.getElementById(scenarioId);
      var predictionList = JSON.parse(xhr.responseText);
      
      for (i = 0; i < predictionList.length; i++) {
        if (predictionList[i]['scenario_id'] == scenarioId) {
          var li = document.createElement("a");
          li.setAttribute('href', "index.html");
          li.setAttribute('id', `${predictionList[i]['scenario_id']}`);
          li.innerHTML = predictionList[i]['prediction_name'] + " - " + predictionList[i]['prediction'] + " mins";
          historyList.appendChild(li);
        }
        
        li.onclick = function(e) {
          for (i = 0; i < predictionList.length; i++) {
            if (predictionList[i]['prediction_name'] == e.target.innerHTML) {
              setScenario(predictionList[i]['input_vars'], e.target.id);
            }
          }
        }
      }
    }
  }

  xhr.open("GET", "/getHistory");
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.send();
}

function loadScenarios() {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var scenarioList = JSON.parse(xhr.responseText);

      var historyList = document.getElementById('past-gens')

      for (i = 0; i < scenarioList.length; i++) {
        var li = document.createElement("li");
        li.setAttribute('id', `${scenarioList[i]['scenario_id']}`);
        li.onclick = function(e) {
          loadHistory(e.target.id);
        }
        li.innerHTML = scenarioList[i]['scenario_name'];
        historyList.appendChild(li);
      }
    }
  }

  xhr.open("GET", "/whatIfGet");
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.send();
}
