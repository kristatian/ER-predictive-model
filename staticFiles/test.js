const text1 = '{"GDP of the year (in trillion USD)": "1.45", "Inflation Rate": "4.9%", "Pandemic": "No", "Month": "dec", "Average Age of province": "5", "Day of the week": "mon", "Holiday": "christmas", "Time of Day": "past-midngt", "Weather": "Sunny", "number of Health care facilities in a 50km radius": "2","Hospital Beds per 1000 people": "23", "Population Density /square km (Hospital Location Marker)": "34", "Injury Type": ["seizure", "heart-atk", "","", "", "", "", "", "fracture", "mild-breathing", "", "", ""],"Injury Zone": "red"}';
const text2 = '{"GDP of the year (in trillion USD)": "23", "Inflation Rate": "34.6%", "Pandemic": "Yes", "Month": "aug", "Average Age of province": "23", "Day of the week": "tue", "Holiday": "halloween", "Time of Day": "early-eve", "Weather": "Thunderstorm", "number of Health care facilities in a 50km radius": "23","Hospital Beds per 1000 people": "21", "Population Density /square km (Hospital Location Marker)": "645", "Injury Type": ["seizure", "", "","minor-injury", "overdose", "", "", "", "", "", "", "", ""],"Injury Zone": "green"}';
const text3 = '{"GDP of the year (in trillion USD)": "544.2", "Inflation Rate": "1%", "Pandemic": "No", "Month": "jan", "Average Age of province": "65", "Day of the week": "wed", "Holiday": "easter", "Time of Day": "late-aft", "Weather": "Snowing", "number of Health care facilities in a 50km radius": "65","Hospital Beds per 1000 people": "5", "Population Density /square km (Hospital Location Marker)": "243", "Injury Type": ["seizure", "heart-atk", "minor-cut","", "", "", "", "", "", "", "", "", ""],"Injury Zone": "yellow"}';
const text4 = '{"GDP of the year (in trillion USD)": "243.654", "Inflation Rate": "7.45%", "Pandemic": "Yes", "Month": "apr", "Average Age of province": "3", "Day of the week": "thu", "Holiday": "new-years", "Time of Day": "late-eve", "Weather": "Foggy", "number of Health care facilities in a 50km radius": "9","Hospital Beds per 1000 people": "435", "Population Density /square km (Hospital Location Marker)": "36344", "Injury Type": ["seizure", "heart-atk", "","", "", "", "", "flu", "", "", "severe-pain", "sprain", ""],"Injury Zone": "red"}';
const text5 = '{"GDP of the year (in trillion USD)": "13", "Inflation Rate": "0%", "Pandemic": "Yes", "Month": "sep", "Average Age of province": "90", "Day of the week": "fri", "Holiday": "val-day", "Time of Day": "past-midngt", "Weather": "Humid", "number of Health care facilities in a 50km radius": "0","Hospital Beds per 1000 people": "877", "Population Density /square km (Hospital Location Marker)": "7", "Injury Type": ["seizure", "heart-atk", "","", "", "", "dislocation", "", "", "", "", "", "stroke"],"Injury Zone": "green"}';

function setScenario(scenario) {
  if (localStorage.getItem("scenario") == null) {
    localStorage.setItem("scenario", "");
  }
  localStorage.setItem("scenario", scenario);
  loadText();
}

function loadText() {
    text = localStorage.getItem("scenario");

    const myArr = JSON.parse(text);

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

    const hol = document.getElementById('holiday');
    hol.value = myArr["Holiday"];

    const timeOfDay = document.getElementById('time');
    timeOfDay.value = myArr["Time of Day"];

    const weather = document.getElementById('weather');
    weather.value = myArr["Weather"];

    const facilities = document.getElementById('num-facilities');
    facilities.value = myArr["number of Health care facilities in a 50km radius"];

    const beds = document.getElementById('beds-avail');
    beds.value = myArr["Hospital Beds per 1000 people"];

    const popDensity = document.getElementById('pop-density');
    popDensity.value = myArr["Population Density /square km (Hospital Location Marker)"];

    for (var i = 0; i < 13; i++) { // clearing injury type before inputs
      const injuryType = document.getElementById('injury' + (i + 1));
      injuryType.checked = false;
    }

    for (var i = 0; i < 13; i++) {
      if (myArr["Injury Type"][i] != '') {
          const injuryType = document.getElementById('injury' + (i + 1));
          injuryType.checked = true;
      }
    }
    const zone = document.getElementById('injury-zone');
    zone.value = myArr["Injury Zone"];
    localStorage.setItem("scenario", "");
}