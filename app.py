from flask import Flask, render_template, redirect, request, abort, jsonify
# from features import feature_form_structure
# from model import predict as pd
from utilities.model import predict as pd
from utilities.features import feature_form_structure

# Create an instance of Flask
app = Flask(__name__)

# Create route that renders index.html

@app.route("/")
def home():
    i = 0
    return render_template("index.html", feature_form_structure=feature_form_structure, i=i)

@app.route("/predict", methods=["POST"])
def predict():
    # if not request.json:
        # abort(400)
    if request.method == 'POST':
        RoomNumber = request.form['RoomNumber']
        DistanceFromCBD = request.form['DistanceFromCBD']
        NumberOfBathroom = request.form['NumberOfBathroom']
        NumberOfCarPark = request.form['NumberOfCarPark']
        AmountOfLandSize = request.form['AmountOfLandSize']
        AmountOfBuildingArea = request.form['AmountOfBuildingArea']
        NumberOfPropertyCount = request.form['NumberOfPropertyCount']
        YearBuiltRanges = request.form['YearBuiltRanges']
        NumberOfCrimeRate = request.form['NumberOfCrimeRate']
        NumberOfNearbySchools = request.form['NumberOfNearbySchools']
        inputvalue = {'RoomNumber': RoomNumber, 
                      'DistanceFromCBD': DistanceFromCBD,
                      'NumberOfBathroom': NumberOfBathroom,
                      'NumberOfCarPark': NumberOfCarPark,
                      'AmountOfLandSize': AmountOfLandSize,
                      'AmountOfBuildingArea': AmountOfBuildingArea,
                      'YearBuiltRanges': YearBuiltRanges,
                      'NumberOfPropertyCount': NumberOfPropertyCount,
                      'NumberOfCrimeRate': NumberOfCrimeRate,
                      'NumberOfNearbySchools': NumberOfNearbySchools}
        print(request.form['RoomNumber'])
        prediction = pd(inputvalue)
        return render_template("index.html", prediction_1=prediction[0])

if __name__ == "__main__":
    app.run(debug=True)