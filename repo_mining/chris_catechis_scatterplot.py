import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import random
import json
import csv

istream = []
authors = []
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
filenames = [x['Filename'] for x in istream]
fileinfo = [y['Fileinfo'] for y in istream]

# parse fileinfo
for entry in fileinfo:
    # remove unneccessary chars
    for char in replaceChars:
        entry = entry.replace(char, '')
    # parse data into arrays
    info = entry.split(',')
    authors.append(info[0])
    info[1] = info[1].strip()
    dates.append(info[1])

# clean data for plotting
today = datetime.now()
print(today)
for date in dates:
    current = datetime.strptime(date, '%Y-%m-%dT%H:%M:%SZ')
    if dates.index(date) == 0:
        min_date = current
    elif current < min_date:
        min_date = current

    current = ((today - current).days / 7)
    y_axis.append(current)

for author in authors:
        current_color = (random.random(), random.random(), random.random())
        colors.append(current_color)

for file in filenames:
    x_axis.append(filenames.index(file))

plt.title('File Touches by Author')
plt.xlabel('File')
plt.ylabel('Weeks')
plt.scatter(x_axis, y_axis, s=75, c=colors)
plt.show()