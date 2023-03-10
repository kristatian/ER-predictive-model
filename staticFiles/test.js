const text1 = '{"gdp-year": "1.45", "inflation-rate": "4.9%", "pandemic-ans": "No", "month": "dec", "average-age": "55", "day-of-wk": "mon", "holiday": "christmas", "time": "past-midngt", "weather": "Sunny", "num-facilities": "2","beds-avail": "23", "pop-density": "34", "injury1": "seizure", "injury2": "heart-atk", "injury9": "fracture","injury-zone": "red"}';
const text2 = '{"gdp-year": "23", "inflation-rate": "34.6%", "pandemic-ans": "Yes", "month": "aug", "average-age": "23", "day-of-wk": "tue", "holiday": "halloween", "time": "early-eve", "weather": "Thunderstorm", "num-facilities": "23","beds-avail": "21", "pop-density": "645", "injury1": "seizure", "injury12": "sprain", "injury9": "fracture", "injury-zone": "green"}';
const text3 = '{"gdp-year": "544.2", "inflation-rate": "1%", "pandemic-ans": "No", "month": "jan", "average-age": "65", "day-of-wk": "wed", "holiday": "easter", "time": "late-aft", "weather": "Snowing", "num-facilities": "65","beds-avail": "5", "pop-density": "243", "injury1": "seizure", "injury2": "heart-atk", "injury4": "minor-injury", "injury-zone": "yellow"}';
const text4 = '{"gdp-year": "243.654", "inflation-rate": "7.45%", "pandemic-ans": "Yes", "month": "jan", "average-age": "33", "day-of-wk": "thu", "holiday": "new-years", "time": "late-eve", "weather": "Foggy", "num-facilities": "9","beds-avail": "435", "pop-density": "36344", "injury1": "seizure", "injury2": "heart-atk", "injury9": "fracture", "injury-zone": "red"}';
const text5 = '{"gdp-year": "13", "inflation-rate": "0%", "pandemic-ans": "Yes", "month": "sep", "average-age": "90", "day-of-wk": "fri", "holiday": "none", "time": "past-midngt", "weather": "Humid", "num-facilities": "0","beds-avail": "877", "pop-density": "7", "injury1": "seizure", "injury2": "heart-atk", "injury7": "dislocation", "injury-zone": "green"}';

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
