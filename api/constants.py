from flask import jsonify


garage_to_id = {
    'Garage A': 'a',
    'Garage B': 'b',
    'Garage C': 'c',
    'Garage D': 'd',
    'Garage H': 'h',
    'Garage I': 'i',
    'Garage Libra': 'l',
}

garages = {'a', 'b', 'c', 'd', 'h', 'i', 'l'}

weekdays = ['sun', 'mon', 'tue', 'wed', 'thr', 'fri', 'sat']

garage_pos_map = {
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
    'h': 4,
    'i': 5,
    'l': 6,
}

garage_capacities = {
    'a': 1623,
    'b': 1259,
    'c': 1852,
    'd': 1241,
    'h': 1284,
    'i': 1231,
    'l': 1007
}
origins = ["http://localhost:3000", "https://ucfgaragepredictions.herokuapp.com"]
front_head = origins[1]

def garage_pos(garage_id):
    return garage_pos_map[garage_id]

def detGarage(garage_id):
    if garage_id in garages:
        return True
    else:
        return False

def detWeek(weekday):
    if weekday in weekdays:
        return True
    else:
        return False

class GeneralErros():

    @staticmethod
    def invalid_id(id_name):
        return jsonify({"error" : "invalid " + id_name + " id"})

    @staticmethod
    def no_error():
        return jsonify({"error" : ""})

    @staticmethod
    def invalid_args():
        return jsonify({"error": "invalid arguments"})
