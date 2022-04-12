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

weekdays = {'mon', 'tue', 'wed', 'thr', 'fri', 'sat', 'sun'}

def garage_pos(garage_id):
    match garage_id:
        case 'a':
            return 0
        case 'b':
            return 1
        case 'c':
            return 2
        case 'd':
            return 3
        case 'h':
            return 4
        case 'i':
            return 5
        case 'l':
            return 6

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