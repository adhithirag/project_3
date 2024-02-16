# import packages
import json

from pymongo import MongoClient
from flask import Flask, jsonify
from bson import json_util

# create Flask
app = Flask(__name__)
mongo = MongoClient(port=27017)
db = mongo['fires_cal']
fires_collection = db['features']


@app.route("/api/v1.0/temperatures/<year_>")
def find_temperature(year_):
    filename = f"../../db/temperature/averaged_tempanomaly_{year_}.json"
    with open(filename) as f:
        json_data = json.load(f)
    return jsonify(json_data)


@app.route("/api/v1.0/find_features/<year>")
def find_features(year):
    query = {"properties.YEAR_": year}
    results = fires_collection.find(query)
    return json.loads(json_util.dumps(results))


if __name__ == '__main__':
    app.run(port=8000, debug=True)
