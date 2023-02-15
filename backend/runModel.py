#!/Users/scads/Downloads/capstone/env/bin/python3
import tensorflow as tf
import pandas as pd
import joblib
import json
import numpy as np
from pathlib import Path
import os

# global mapping files for data transformation
month_map = {
    'December' : 12,
    'January' : 1,
    'February' : 2,
    'March' : 3,
    'April' : 4,
    'May' : 5,
    'June' : 6,
    'July' : 7,
    'August' : 8,
    'September' : 9,
    'October' : 10,
    'November' : 11,
}

week_map = {
    'Monday' : 1,
    'Tuesday' : 2,
    'Wednesday' : 3,
    'Thursday' : 4,
    'Friday' : 5,
    'Saturday' : 6,
    'Sunday' : 7,
}

color_map = {
    'Red' : 0,
    'Yellow' : 1,
    'Green' : 2,
}

data_frame_columns = [
       'GDP of the year (in trillion USD)', 'Inflation Rate', 'Pandemic',
       'Month', 'Day of the week', 'Hospital Beds per 1000 people',
       'Population Density /square km (Hospital Location Marker)',
       'Injury Zone', 'Average Age of province',
       'number of Health care facilities in a 50km radius', 'Black Friday',
       'Canada Day', 'Christmas Day', 'Easter Sunday', 'Halloween',
       'Labor Day', "New Year's Day", "New Year's Eve", "St. Patrick's Day",
       'Super bowl', 'Thanksgiving', "Valentine's Day", 'Victoria Day',
       'Foggy', 'Ice Snow', 'Rainy', 'Snowy', 'Windy', 'Early Evening',
       'Early Morning', 'Late Afternoon', 'Late Evening', 'Late Morning',
       'Past Midnight', 'Active Seizure', 'Cardiac Arrest', 'Dislocation',
       'Drug Overdose', 'Flu', 'Heart Attack', 'Limb Fracture',
       'Mild Breathing difficulties', 'Minor Cuts', 'Minor Injury',
       'Severe Pain', 'Sprain', 'Stroke']

# load the ml model to be actually used 
def loadModel(modelPath):
    return tf.keras.models.load_model(modelPath)

# Run if the input is a json file
def readJsonFile(path):
    file = open(path,'r')
    dictionary = json.load(file)
    return dictionary

# Run if the input is a string in json format
def readJsonString(string):
    dictionary = json.loads(string)
    return dictionary

# generate prediciton using the model with the given input variables
def createPrediction(model,predictors):
    prediction = model.predict(x=predictors)
    return prediction

# load the scaler we will use
def loadScaler(scalerPath):
    return joblib.load(scalerPath)

# normalize the input data
def scaleData(data,scaler):
    scaled_data = scaler.transform(data)
    return scaled_data

# process the data to fit the expected format
def processData(dataIn,scaler):
    # convert dictionary into dataframe
    df = pd.DataFrame.from_dict([dataIn])
    print(df)
    # convert string values into numericals
    df['Month'] = df['Month'].apply(lambda x: month_map[x])
    df['Day of the week'] = df['Day of the week'].apply(lambda x : week_map[x])
    df['Pandemic'] = df['Pandemic'].apply(lambda x: 1 if x == "Yes" else 0)
    df['GDP of the year (in trillion USD)'] = df['GDP of the year (in trillion USD)'].apply(lambda x : float(str(x).replace("(projected)","")))
    df['Injury Zone'] = df['Injury Zone'].apply(lambda x : color_map[x])

    # create the dataframe to be input to the model, preempt the columns with zeros which will be replaced if the value exists in the input json
    data = pd.DataFrame(np.zeros((1, len(data_frame_columns))),columns=data_frame_columns)

    # move the information into a more complete dataframe
    for key in df:
        data[key] = df[key]

    # scale the data
    scaled_data = scaleData(data,scaler)
    
    return scaled_data

# format prediction into json format
def formatPrediction():
    print("placeholder")

def getModel(model):
    if (model == 0):
        return "\saved_model\model_larger_test_2_0"
    elif(model == 1):
        return "\saved_model\model_larger_test_2_20_percent_2"
    elif(model == 2):
        return "\saved_model\model_updated1"
    elif(model == 3):
        return "\saved_model\model_updated2"


# Main code funcitonality
def runModel(jsonIn,model=0, scalerLoc = "\\backend\scalerNew.gz", isFile = 0, isString = 0):
    # get Model
    directory = str(os.getcwd())
    print(directory)
    modelLoc = directory + "\\backend" + getModel(model)
    # load the model
    model1 = loadModel(modelLoc)
    #print(model1.summary())
    # load the scaler
    scaler1 = loadScaler(directory + scalerLoc)
    # parse the json inputs
    # depending on user input it can be a file or string
    if (isFile == 1):
        inputs = readJsonFile(jsonIn)
    elif(isString == 1):
        inputs = readJsonString(jsonIn)
    else:
        inputs = jsonIn
    # data pipeline
    data = processData(inputs,scaler1)
    # generate predicitons
    prediction = createPrediction(model1,data)
    # debug print to view predictions
    print(prediction)
    # return the prediction value to the caller
    return prediction[0][0]

# debug run 
if __name__ == '__main__':
    runModel('''{
        "GDP of the year (in trillion USD)":2.1,
        "Inflation Rate":6.3, 
        "Pandemic":"Yes",
        "Month":"April", 
        "Day of the week":"Sunday", 
        "Hospital Beds per 1000 people":2.34,
        "Population Density /square km (Hospital Location Marker)":16000,
        "Injury Zone":"Yellow",
        "Average Age of province":42,
        "number of Health care facilities in a 50km radius":6,
        "New Year's Eve":1,
        "Foggy":1,
        "Past Midnight":1,
        "Cardiac Arrest":1
    }''')
