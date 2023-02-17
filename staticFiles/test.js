const text1 = '{"GDP of the year (in trillion USD)": "1.45", "Inflation Rate": "4.9%", "Pandemic": "No", "Month": "dec", "Average Age of province": "5", "Day of the week": "mon", "Holiday": "christmas", "Time of Day": "past-midngt", "Weather": "Sunny", "number of Health care facilities in a 50km radius": "2","Hospital Beds per 1000 people": "23", "Population Density /square km (Hospital Location Marker)": "34", "Injury Type": ["seizure", "heart-atk", "","", "", "", "", "", "fracture", "mild-breathing", "", "", ""],"Injury Zone": "red"}';
const text2 = '{"GDP of the year (in trillion USD)": "23", "Inflation Rate": "34.6%", "Pandemic": "Yes", "Month": "aug", "Average Age of province": "23", "Day of the week": "tue", "Holiday": "halloween", "Time of Day": "early-eve", "Weather": "Thunderstorm", "number of Health care facilities in a 50km radius": "23","Hospital Beds per 1000 people": "21", "Population Density /square km (Hospital Location Marker)": "645", "Injury Type": ["seizure", "", "","minor-injury", "overdose", "", "", "", "", "", "", "", ""],"Injury Zone": "green"}';
const text3 = '{"GDP of the year (in trillion USD)": "544.2", "Inflation Rate": "1%", "Pandemic": "No", "Month": "jan", "Average Age of province": "65", "Day of the week": "wed", "Holiday": "easter", "Time of Day": "late-aft", "Weather": "Snowing", "number of Health care facilities in a 50km radius": "65","Hospital Beds per 1000 people": "5", "Population Density /square km (Hospital Location Marker)": "243", "Injury Type": ["seizure", "heart-atk", "minor-cut","", "", "", "", "", "", "", "", "", ""],"Injury Zone": "yellow"}';
const text4 = '{"GDP of the year (in trillion USD)": "243.654", "Inflation Rate": "7.45%", "Pandemic": "Yes", "Month": "apr", "Average Age of province": "3", "Day of the week": "thu", "Holiday": "new-years", "Time of Day": "late-eve", "Weather": "Foggy", "number of Health care facilities in a 50km radius": "9","Hospital Beds per 1000 people": "435", "Population Density /square km (Hospital Location Marker)": "36344", "Injury Type": ["seizure", "heart-atk", "","", "", "", "", "flu", "", "", "severe-pain", "sprain", ""],"Injury Zone": "red"}';
const text5 = '{"GDP of the year (in trillion USD)": "13", "Inflation Rate": "0%", "Pandemic": "Yes", "Month": "sep", "Average Age of province": "90", "Day of the week": "fri", "Holiday": "val-day", "Time of Day": "past-midngt", "Weather": "Humid", "number of Health care facilities in a 50km radius": "0","Hospital Beds per 1000 people": "877", "Population Density /square km (Hospital Location Marker)": "7", "Injury Type": ["seizure", "heart-atk", "","", "", "", "dislocation", "", "", "", "", "", "stroke"],"Injury Zone": "green"}';

function setScenario(scenario) {
  if (localStorage.getItem("scenario") == null) {
    localStorage.setItem("scenario", "{}");
    console.log("initializing scenario");
  }
  localStorage.setItem("scenario", scenario);
  console.log(scenario);
  loadText();
}

function loadText() {
    if (localStorage.getItem("scenario") == null) {
      localStorage.setItem("scenario", "{}");
    }

    text = localStorage.getItem("scenario");
    
    const myArr = JSON.parse(text);
    
    if (!(Object.keys(myArr).length === 0)) {
      const gdp = document.getElementById('gdp-year');
      gdp.value = myArr["gdp-year"];

      const inf = document.getElementById('inflation-rate');
      inf.value = myArr["inflation-rate"];

      const panedmicY = document.getElementById('pandemic-yes');
      const panedmicN = document.getElementById('pandemic-no');

      if (myArr["pandemic-ans"] == 'Yes') {
        panedmicY.checked = true;
      } else {
        panedmicN.checked = true;
      }

      const month = document.getElementById('month');
      month.value = myArr["month"];

      const avgAge = document.getElementById('average-age');
      avgAge.value = myArr["average-age"];

      const day = document.getElementById('day-of-wk');
      day.value = myArr["day-of-wk"];

      const hol = document.getElementById('holiday');
      hol.value = myArr["holiday"];

      const timeOfDay = document.getElementById('time');
      timeOfDay.value = myArr["time"];

      const weather = document.getElementById('weather');
      weather.value = myArr["weather"];

      const facilities = document.getElementById('num-facilities');
      facilities.value = myArr["num-facilities"];

      const beds = document.getElementById('beds-avail');
      beds.value = myArr["beds-avail"];

      const popDensity = document.getElementById('pop-density');
      popDensity.value = myArr["pop-density"];

      for (var i = 0; i < 13; i++) { // clearing injury type before inputs
        const injuryType = document.getElementById('injury' + (i + 1));
        injuryType.checked = false;
      }

      for (var i = 1; i < 14; i++) {
        if (myArr["injury" + i] != null) {
            const injuryType = document.getElementById('injury' + i);
            injuryType.checked = true;
        }
      }

      const zone = document.getElementById('injury-zone');
      zone.value = myArr["injury-zone"];
      
      localStorage.setItem("scenario", "{}");
    }
}

document.getElementById('prediction-form').addEventListener('submit', function(e) {
  if (localStorage.getItem("scenarios") == null) {
    localStorage.setItem("scenarios", "[]");
  }
  var scenario_list = JSON.parse(localStorage.getItem("scenarios"));

  const form = new FormData(document.getElementById('prediction-form'));
  var object = {};
  form.forEach(function(value, key){
      object[key] = value;
  });
  var json = JSON.stringify(object);
  
  scenario_list.push(json);
  scenario_list = [...new Set(scenario_list)];

  localStorage.setItem("scenarios", JSON.stringify(scenario_list));
})


function loadHistory() {

  var historyList = document.getElementById('past-gens')
  var scenarioList = JSON.parse(localStorage.getItem("scenarios"));


  for (i = 0; i < scenarioList.length; i++) {
    var li = document.createElement("a");
    li.setAttribute('href', "index.html");
    li.setAttribute('id', `${i}`);
    li.onclick = function(e) {
      var scenarioList = JSON.parse(localStorage.getItem("scenarios"));
      setScenario(scenarioList[parseInt(e.target.id)]);
    }
    li.innerHTML = "Saved Report " + (i + 1);
    historyList.appendChild(li);
  }
}
