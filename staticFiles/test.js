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

function loadPrediction() {
  document.cookie = "scenarioId=" + localStorage.getItem("scenarioID");

  text = localStorage.getItem("inputs");
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
  }
}

function deletePrediction() {
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", "/deletePrediction");
  xhr.setRequestHeader("Content-Type", "application/json")
  console.log(localStorage.getItem("requestID"));
  xhr.send(requestID = localStorage.getItem("requestID"));
  window.location.reload();
}

function deleteScenario() {
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", "/deleteScenario");
  xhr.setRequestHeader("Content-Type", "application/json")
  console.log(localStorage.getItem("scenarioID"));
  xhr.send(scenarioID = localStorage.getItem("scenarioID"));
  window.location.reload();
}

function loadScenarios() {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {

      var inputs = JSON.parse(xhr.responseText);

      var scenarioList = inputs['0'];
      var predictionList = inputs['1'];

      var historyList = document.getElementById('past-gens')
      console.log(scenarioList);
      for (i = 0; i < scenarioList.length; i++) {
        console.log(scenarioList[i]);
        var div = document.createElement("div");
        var li = document.createElement("a");
        var ul = document.createElement("ul");
        li.setAttribute('id', `${scenarioList[i]['scenario_id']}`);
        ul.setAttribute('id', `${scenarioList[i]['scenario_id']}`);
        //li.setAttribute('href', "index.html");
        li.onclick = function(e) {
          for (m = 0; m < scenarioList.length; m++) {
            if (scenarioList[m]['scenario_name'] == e.target.innerHTML) {
              localStorage.setItem("scenarioID", scenarioList[m]['scenario_id']);
              setInputs2(scenarioList[m]['input_vars']);
              //setScenario(scenarioList[m]['input_vars'], e.target.id);
            }
          }
        }
        li.innerHTML = scenarioList[i]['scenario_name'];
        div.appendChild(li);
        div.appendChild(ul);
        historyList.appendChild(div);

        for (j = 0; j < predictionList.length; j++) {
          if (predictionList[j]['scenario_id'] == scenarioList[i]['scenario_id']) {
            var a = document.createElement("li");
            //a.setAttribute('href', "index.html");
            a.setAttribute('id', `${predictionList[j]['scenario_id']}`);
            a.innerHTML = predictionList[j]['prediction_name'];
            ul.appendChild(a);

            a.onclick = function(e) {
              for (k = 0; k < predictionList.length; k++) {
                if (predictionList[k]['prediction_name'] == e.target.innerHTML) {
                  setInputs1(predictionList[k]['input_vars'], predictionList[k]['prediction'], predictionList[k]['date_time']);
                  localStorage.setItem("scenarioID", predictionList[k]['scenario_id']);
                  localStorage.setItem("requestID", predictionList[k]['request_id']);
                }
              }
            }
          }
        }
      }
    }
  }

  xhr.open("GET", "/whatIfGet");
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.send();
}

function setInputs1(inputs, prediction, date) {
  localStorage.setItem("inputs", inputs)
  localStorage.setItem("scenario", inputs)
  localStorage.setItem("inputsJSON", JSON.stringify(inputs))
  loadInputs1(prediction, date);
}

function setInputs2(inputs) {
  localStorage.setItem("inputs", inputs)
  localStorage.setItem("scenario", inputs)
  localStorage.setItem("inputsJSON", JSON.stringify(inputs))
  document.getElementById('id05').style.display='block';
}

function loadInputs1(prediction, date) {
  document.getElementById('id04').style.display='block';

  text = localStorage.getItem("inputs");
  const myArr = JSON.parse(text);

  keysArr = [];
  for (key in myArr) {
    keysArr.push(key);
  }

  if (!(Object.keys(myArr).length === 0)) {

    var hol = "";
    var timeOfDay = "";
    var weather = "";
    var injuryType = "";

    holList = ["Christmas Day", "New Year's Eve", "New Year's Day", "Black Friday", "Labor Day", "Easter Sunday", "Halloween", "Canada Day", "Thanksgiving", "Victoria Day", "Valentine's Day", "Super bowl", "St. Patrick's Day"];
    timeList = ["Early Morning", "Early Afternoon", "Early Evening", "Late Morning", "Late Afternoon", "Late Evening", "Past Midnight"];
    injuryList = ["Active Seizure", "Heart Attack", "Minor Cuts", "Minor Injury", "Drug Overdose", "Cardiac Arrest", "Dislocation", "Flu", "Limb Fracture", "Mild Breathing Difficulties", "Severe Pain", "Sprain", "Abdominal Pain", "Stroke"];
    weatherList = ["Sunny", "Foggy", "Ice Snow", "Rainy", "Snowy", "Windy"];

    keysArr.forEach(key => {
      if (holList.includes(key)) {
        hol = key;
      }

      if (timeList.includes(key)) {
        timeOfDay = key;
      }

      if (weatherList.includes(key)) {
        weather = key;
      }

      if (injuryList.includes(key)) {
        injuryType = key;
      }
    })

    var gdp = myArr["GDP of the year (in trillion USD)"];
    var inf = myArr["Inflation Rate"];

    var panedmic = myArr["Pandemic"];
    var month = myArr["Month"];
    var avgAge = myArr["Average Age of province"];
    var day = myArr["Day of the week"];

    var facilities = myArr["number of Health care facilities in a 50km radius"];
    var beds = myArr["Hospital Beds per 1000 people"];
    var popDensity = myArr["Population Density /square km (Hospital Location Marker)"];
    var zone = myArr["Injury Zone"];

    var hours = Math.floor(parseInt(prediction) / 60);
    var mins = Math.round(prediction % 60);

    document.getElementById('pred-mins').innerHTML = hours + " hours " + mins + " mins";
    document.getElementById('gdp-text').innerHTML = "<em>" + "GDP: " + "</em>" + gdp;
    document.getElementById('inflation-text').innerHTML = "<em>" + "Inflation: " + "</em>" + inf + " %";
    document.getElementById('pandemic-text').innerHTML = "<em>" + "Pandemic: " + "</em>" + panedmic;
    document.getElementById('month-text').innerHTML = "<em>" + "Month: " + "</em>" + month;
    document.getElementById('age-text').innerHTML = "<em>" + "Average Age of Province: " + "</em>" + avgAge;
    document.getElementById('day-text').innerHTML = "<em>" + "Day of the Week: " + "</em>" + day;
    document.getElementById('holiday-text').innerHTML = "<em>" + "Holiday: " + "</em>" + hol;
    document.getElementById('time-text').innerHTML = "<em>" + "Time of Day: " + "</em>" + timeOfDay;
    document.getElementById('weather-text').innerHTML = "<em>" + "Weather: " + "</em>" + weather;
    document.getElementById('facilities-text').innerHTML ="<em>" +  "Facilities Within 50 KM Radius: " + "</em>" + facilities;
    document.getElementById('beds-text').innerHTML = "<em>" + "Beds Available Per 1000 People: " + "</em>" + beds;
    document.getElementById('pop-text').innerHTML = "<em>" + "Population Density Per Sq KM: " + "</em>" + popDensity;
    document.getElementById('injury-text').innerHTML = "<em>" + "Injury Type: " + "</em>" + injuryType;
    document.getElementById('injuryzone-text').innerHTML = "<em>" + "Injury Zone: " + "</em>" + zone;
    document.getElementById('date-generated').innerHTML = "Date Generated: " + date;
  }
}