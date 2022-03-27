import pickle
import pandas as pd

garages = ['Garage Libra', 'Garage A', 'Garage C', 'Garage D', 'Garage I']

garage_ids = {
    'Garage Libra': 'l',
    'Garage A': 'a',
    'Garage C': 'c',
    'Garage D': 'd',
    'Garage I': 'i',
}

models = {}

def load_pickle(filename):
    f = open(filename, 'rb')
    obj = pickle.load(f)
    f.close()
    return obj

class ModelWrapper:
    def __init__(self, id):
        self.scaler = load_pickle('pickles/garage_scaler_' + garage + '.pkl')
        self.poly = load_pickle('pickles/garage_poly_' + garage + '.pkl')
        self.model = load_pickle('pickles/garage_model_' + garage + '.pkl')

    def scale_input(self, samples):
        scaled_samples = self.scaler.transform(samples)
        poly_samples = self.poly.transform(scaled_samples)
        return poly_samples

    def predict(self, samples):
        return self.model.predict(self.scale_input(samples))

    def predict_one(self, sample):
        samples = pd.DataFrame({k : [sample[k]] for k in sample})
        return self.predict(samples)[0]

for i, garage in enumerate(garage_ids.values()):
    models[garage] = ModelWrapper(garage)
