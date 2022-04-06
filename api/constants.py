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

weekdays = {'mon', 'tue', 'wed', 'thr', 'fri', 'sat', 'sun'}

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