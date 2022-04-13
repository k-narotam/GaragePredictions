from .train_models import models_raw

garages = ['Garage Libra', 'Garage A', 'Garage C', 'Garage D', 'Garage I']

garage_ids = {
    'Garage Libra': 'l',
    'Garage A': 'a',
    'Garage C': 'c',
    'Garage D': 'd',
    'Garage I': 'i',
}

models = {}

class ModelWrapper:
    def __init__(self, id):
        try:
            self.model_base = models_raw[id][0]
            self.model_weather = models_raw[id][1]
            print('loaded model', garage)
        except FileNotFoundError:
            self.model_base = None
            self.model_weather = None
            print('could not find models for garage', garage)

    def predict(self, samples):
        predictions = []
        if self.model_base and self.model_weather:
            for sample in samples:
                predictions.append(self.model_base.predict('week_progress', sample['week_progress'] / 168) + self.model_weather.predict('weather', sample['weather']))
        return predictions

for i, garage in enumerate(garage_ids.values()):
    models[garage] = ModelWrapper(garage)
