const text1 = '{"gdp-year": "1.45", "inflation-rate": "4.9%", "pandemic-ans": "No", "month": "December", "average-age": "55", "day-of-wk": "Monday", "holiday": "christmas", "time": "Past Midnight", "weather": "Sunny", "num-facilities": "2","beds-avail": "23", "pop-density": "34", "injury-type-ans": "Minor Injury" ,"injury-zone": "red"}';
const text2 = '{"gdp-year": "23", "inflation-rate": "34.6%", "pandemic-ans": "Yes", "month": "August", "average-age": "23", "day-of-wk": "Tuesday", "holiday": "halloween", "time": "Early Evening", "weather": "Thunderstorm", "num-facilities": "23","beds-avail": "21", "pop-density": "645", "injury-type-ans": "Severe Pain", "injury-zone": "green"}';
const text3 = '{"gdp-year": "544.2", "inflation-rate": "1%", "pandemic-ans": "No", "month": "January", "average-age": "65", "day-of-wk": "Wednesday", "holiday": "easter", "time": "Late Afternoon", "weather": "Snowing", "num-facilities": "65","beds-avail": "5", "pop-density": "243", "injury-type-ans": "Cardiac Arrest", "injury-zone": "yellow"}';
const text4 = '{"gdp-year": "243.654", "inflation-rate": "7.45%", "pandemic-ans": "Yes", "month": "January", "average-age": "33", "day-of-wk": "Thursday", "holiday": "new-years", "time": "Late Evening", "weather": "Foggy", "num-facilities": "9","beds-avail": "435", "pop-density": "36344", "injury-type-ans": "Flu", "injury-zone": "red"}';
const text5 = '{"gdp-year": "13", "inflation-rate": "0%", "pandemic-ans": "Yes", "month": "September", "average-age": "90", "day-of-wk": "Friday", "holiday": "none", "time": "Past Midnight", "weather": "Humid", "num-facilities": "0","beds-avail": "877", "pop-density": "7", "injury-type-ans": "Drug Overdose", "injury-zone": "green"}';

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

      // might need some code to uncheck all fields before loading
      
      const itSeizure = document.getElementById('seizure');
      const itHeartAtk = document.getElementById('heart-atk');
      const itMinorCut = document.getElementById('minor-cut');
      const itMinorInjury = document.getElementById('minor-injury');
      const itOverdose = document.getElementById('overdose');
      const itCardiacArrest = document.getElementById('cardiac-arrest');
      const itDislocation = document.getElementById('dislocation');
      const itFlu = document.getElementById('flu');
      const itFracture = document.getElementById('fracture');
      const itMildBreathing = document.getElementById('mild-breathing');
      const itSeverePain = document.getElementById('severe-pain');
      const itSprain = document.getElementById('sprain');
      const itStroke = document.getElementById('stroke');


      if (myArr["injury-type-ans"] == 'Active Seizure') {
        itSeizure.checked = true;
      } else if (myArr["injury-type-ans"] == 'Heart Attack') {
        itHeartAtk.checked = true;
      } else if (myArr["injury-type-ans"] == 'Minor Cuts') {
        itMinorCut.checked = true;
      } else if (myArr["injury-type-ans"] == 'Minor Injury') {
        itMinorInjury.checked = true;
      } else if (myArr["injury-type-ans"] == 'Drug Overdose') {
        itOverdose.checked = true;
      } else if (myArr["injury-type-ans"] == 'Cardiac Arrest') {
        itCardiacArrest.checked = true;
      } else if (myArr["injury-type-ans"] == 'Dislocation') {
        itDislocation.checked = true;
      } else if (myArr["injury-type-ans"] == 'Flu') {
        itFlu.checked = true;
      } else if (myArr["injury-type-ans"] == 'Fracture') {
        itFracture.checked = true;
      } else if (myArr["injury-type-ans"] == 'Mild Breathing Difficulties') {
        itMildBreathing.checked = true;
      } else if (myArr["injury-type-ans"] == 'Severe Pain') {
        itSeverePain.checked = true;
      } else if (myArr["injury-type-ans"] == 'Sprain') {
        itSprain.checked = true;
      } else if (myArr["injury-type-ans"] == 'Stroke') {
        itStroke.checked = true;
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
