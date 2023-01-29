import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import random
import json
import csv

istream = []
files = []
dates = []
x_axis = []
y_axis = []
colors = []
replaceChars = ['[', ']', '\'']

with open('repo_mining/data/file_chris_datarootbeer.csv', 'r') as csvfile:
    infile = csv.DictReader(csvfile)
    for row in infile:
        istream.append(dict(row))

# pasrse csv
authors = [x['Author'] for x in istream]
fileinfo = [y['Fileinfo'] for y in istream]

# parse fileinfo
for entry in fileinfo:
    # remove unneccessary chars
    current_color = (np.random.random(), np.random.random(), np.random.random())
    for char in replaceChars:
        entry = entry.replace(char, '')
    # parse data into arrays
    info = entry.split(',')
    for data in info:
        if (info.index(data) % 2 == 0):
            files.append(data)
            colors.append(current_color)
        else:
            data = data.strip()
            dates.append(data)

# clean data for plotting
today = datetime.now()
for date in dates:
    current = datetime.strptime(date, '%Y-%m-%dT%H:%M:%SZ')
    if dates.index(date) == 0:
        min_date = current
    elif current < min_date:
        min_date = current

    current = ((today - current).days / 7)
    y_axis.append(current)

for file in files:
    x_axis.append(files.index(file))


plt.title('File Touches by Author')
plt.xlabel('File')
plt.ylabel('Weeks')
plt.scatter(x_axis, y_axis, s=30, c=colors)
plt.show()