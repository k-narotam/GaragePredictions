import numpy as np
import pandas as pd
# import matplotlib.pyplot as plt
import pickle

def load_model(filename):
    f = open(filename + '.mdl', 'rb')
    obj = pickle.load(f)
    f.close()
    return obj

class AvgModel:
    def __init__(self):
        self.params = {}

    def add_param(self, feature_id, bucket_count=100, smooth_cycles=0, wrt=None):
        self.params[feature_id] = {'buckets': bucket_count, 'smooth_cycles': smooth_cycles, 'wrt': wrt}

    def smooth(self, feature_id, cycles=0):
        for j in range(cycles):
            ref_avg = self.buckets[feature_id]
            for i, sample in enumerate(self.buckets[feature_id]):
                before = max(0, i - 1)
                after = min(i + 1, len(self.buckets[feature_id]) - 1)
                self.buckets[feature_id][i] = (self.buckets[feature_id][before] + self.buckets[feature_id][after] + self.buckets[feature_id][i] * 8) / 10

    def fit(self, x_train, y_train):
        self.buckets = {}
        for col in x_train.columns:
            if col in self.params:
                self.buckets[col] = [[0, 0] for i in range(self.params[col]['buckets'] + 1)]
                self.params[col]['min'] = x_train[col].min()
                self.params[col]['max'] = x_train[col].max()
                self.params[col]['spread'] = self.params[col]['max'] - self.params[col]['min']

        for i, sample in x_train.iterrows():
            for feature in self.buckets:
                bucket_i = int((sample[feature] - self.params[feature]['min']) / self.params[feature]['spread'] * self.params[feature]['buckets'])
                self.buckets[feature][bucket_i][0] += y_train[i]
                self.buckets[feature][bucket_i][1] += 1

        for feature in self.buckets:
            for i, bucket in enumerate(self.buckets[feature]):
                try:
                    self.buckets[feature][i] = bucket[0] / bucket[1]
                except ZeroDivisionError:
                    if i != 0:
                        self.buckets[feature][i] = self.buckets[feature][i - 1]
                    else:
                        self.buckets[feature][i] = self.params[feature]['min']

            self.smooth(feature, cycles=self.params[feature]['smooth_cycles'])
            self.params[feature]['std'] = np.std(self.buckets[feature])

    def graph(self, feature_id):
        plt.plot(list(range(len(self.buckets[feature_id]))), self.buckets[feature_id])
        plt.show()

    def predict(self, feature_id, x):
        # clamp
        x = max(min(x, self.params[feature_id]['max']), self.params[feature_id]['min'])
        x_index = int((x - self.params[feature_id]['min']) / self.params[feature_id]['spread'] * self.params[feature_id]['buckets'])
        return self.buckets[feature_id][x_index]

    def bucket_diff_by(self, bucket_feature, source_feature, x_train, y_train):
        new_x = []
        new_y = []
        for i, sample in x_train.iterrows():
            x = sample[source_feature]
            y_predicted = self.predict(source_feature, x)
            diff = y_train[i] - y_predicted
            bucket_val = sample[bucket_feature]
            new_x.append(bucket_val)
            new_y.append(diff)
        return pd.DataFrame({bucket_feature: new_x}), new_y

    def save(self, filename):
        f = open(filename + '.mdl', 'wb')
        pickle.dump(self, f, protocol=pickle.HIGHEST_PROTOCOL)
        f.close()
