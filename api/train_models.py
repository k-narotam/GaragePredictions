from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import math
#import matplotlib.pyplot as plt
import pickle
from sklearn.metrics import r2_score

from .avg_model import AvgModel

def save_pickle(filename, object):
    f = open(filename, 'wb')
    pickle.dump(object, f, protocol=pickle.HIGHEST_PROTOCOL)
    f.close()

def RMSE(predicted, actual):
    count = len(actual)
    sum = 0
    for i, y in enumerate(actual):
        sum += (y - predicted[i]) ** 2
    return math.sqrt(sum / count)

garages = ['Garage Libra', 'Garage A', 'Garage C', 'Garage D', 'Garage I']
garage_ids = {
    'Garage Libra': 'l',
    'Garage A': 'a',
    'Garage C': 'c',
    'Garage D': 'd',
    'Garage I': 'i',
}

#figure, axis = plt.subplots(2, math.ceil(len(garages) / 2))

df = pd.read_csv('api/dataset.csv')

models_raw = {}

for garage_i, garage in enumerate(garages):
    garage_df = df.loc[df['garage'] == garage]
    garage_df_copy = garage_df.copy()
    y_set = garage_df_copy.pop('space_avail')
    x_set = garage_df_copy[['week_progress', 'weather']]

    x_train, x_test, y_train, y_test = train_test_split(x_set, y_set, test_size=0.2)

    model = AvgModel()
    model.add_param('week_progress', bucket_count=168 * 4, smooth_cycles=3)
    model.add_param('weather', bucket_count=10, smooth_cycles=5)
    model.fit(x_train, y_train)

    weather_x, weather_y = model.bucket_diff_by('weather', 'week_progress', x_train, y_train)
    weather_model = AvgModel()
    weather_model.add_param('weather', bucket_count=10, smooth_cycles=5)
    weather_model.fit(weather_x, weather_y)

    predicted = []
    for i, sample in x_test.iterrows():
        predicted.append(model.predict('week_progress', sample['week_progress']) + weather_model.predict('weather', sample['weather']))

    #model.save('models/' + garage_ids[garage] + '_base_model')
    #weather_model.save('models/' + garage_ids[garage] + '_weather_model')

    #print('---', garage, '---')
    #print('RMSE:', RMSE(predicted, y_test))
    #print('R^2:', r2_score(y_test, predicted))

    models_raw[garage_ids[garage]] = (model, weather_model)

    #axis[garage_i % 2, garage_i // 2].scatter(predicted, y_test)
    #axis[garage_i % 2, garage_i // 2].set_title(garage + ' - R^2: ' + str(round(r2_score(y_test, predicted), 2)))

#plt.show()
