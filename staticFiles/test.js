const text1 = '{"gdp-year": "1.45", "inflation-rate": "4.9", "pandemic-ans": "No", "month": "December", "average-age": "55", "day-of-wk": "Monday", "Christmas Day" : "1", "Past Midnight" : "1", "weather": "Sunny", "num-facilities": "2","beds-avail": "23", "pop-density": "34", "Minor Injury" : "1" ,"injury-zone": "Red"}';
const text2 = '{"gdp-year": "1", "inflation-rate": "8", "pandemic-ans": "Yes", "month": "August", "average-age": "23", "day-of-wk": "Tuesday", "Halloween" : "1", "Early Evening" : "1", "weather": "Rainy", "num-facilities": "3","beds-avail": "21", "pop-density": "645", "Severe Pain" : "1", "injury-zone": "Green"}';
const text3 = '{"gdp-year": "5", "inflation-rate": "1", "pandemic-ans": "No", "month": "January", "average-age": "65", "day-of-wk": "Wednesday", "Easter Sunday" : "1", "Late Afternoon" : "1", "weather": "Snowy", "num-facilities": "6","beds-avail": "5", "pop-density": "243", "Cardiac Arrest" : "1", "injury-zone": "Yellow"}';
const text4 = '{"gdp-year": "3", "inflation-rate": "7.45", "pandemic-ans": "Yes", "month": "January", "average-age": "33", "day-of-wk": "Thursday", "New Year\'s Day" : "1", "Late Evening" : "1", "weather": "Foggy", "num-facilities": "9","beds-avail": "4", "pop-density": "36344", "Flu" : "1", "injury-zone": "Red"}';
const text5 = '{"gdp-year": "0.5", "inflation-rate": "0.5", "pandemic-ans": "Yes", "month": "September", "average-age": "90", "day-of-wk": "Friday", "None" : "1", "Past Midnight" : "1", "weather": "Rainy", "num-facilities": "1","beds-avail": "7", "pop-density": "7", "Drug Overdose" : "1", "injury-zone": "Green"}';


function setScenario(scenario,scenarioId) {
  if (localStorage.getItem("scenario") == null) {
    localStorage.setItem("scenario", "{}");
    console.log("initializing scenario");
  }
  localStorage.setItem("scenario", scenario);

  console.log("scenario: " + scenario);
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

    console.log(keysArr)
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
      hol.value = keysArr[6];
      

      const timeOfDay = document.getElementById('time');
      timeOfDay.value = keysArr[7];

      const weather = document.getElementById('weather');
      weather.value = myArr["weather"];

      const facilities = document.getElementById('num-facilities');
      facilities.value = myArr["num-facilities"];

      const beds = document.getElementById('beds-avail');
      beds.value = myArr["beds-avail"];

      const popDensity = document.getElementById('pop-density');
      popDensity.value = myArr["pop-density"];
      
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

      if (keysArr[12] == 'Active Seizure') {
        itSeizure.checked = true;
      } else if (keysArr[12] == 'Heart Attack') {
        itHeartAtk.checked = true;
      } else if (keysArr[12] == 'Minor Cuts') {
        itMinorCut.checked = true;
      } else if (keysArr[12] == 'Minor Injury') {
        itMinorInjury.checked = true;
      } else if (keysArr[12] == 'Drug Overdose') {
        itOverdose.checked = true;
      } else if (keysArr[12] == 'Cardiac Arrest') {
        itCardiacArrest.checked = true;
      } else if (keysArr[12] == 'Dislocation') {
        itDislocation.checked = true;
      } else if (keysArr[12] == 'Flu') {
        itFlu.checked = true;
      } else if (keysArr[12] == 'Fracture') {
        itFracture.checked = true;
      } else if (keysArr[12] == 'Mild Breathing Difficulties') {
        itMildBreathing.checked = true;
      } else if (keysArr[12] == 'Severe Pain') {
        itSeverePain.checked = true;
      } else if (keysArr[12] == 'Sprain') {
        itSprain.checked = true;
      } else if (keysArr[12] == 'Stroke') {
        itStroke.checked = true;
      }

      const zone = document.getElementById('injury-zone');
      zone.value = myArr["injury-zone"];
      
      localStorage.setItem("scenario", "{}");
      //location.reload();
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
