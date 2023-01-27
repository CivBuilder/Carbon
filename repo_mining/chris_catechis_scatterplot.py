import numpy as np
import matplotlib.pyplot as plt
import random
import json
import csv

readin = []

with open('repo_mining/data/file_chris_datarootbeer.csv', 'r') as file:
    infile = csv.DictReader(file)
    for row in infile:
        readin.append(dict(row))


filename = [x['Filename'] for x in readin]
fileinfo = [x['fileInfo'] for x in readin]

plt.plot(filename, fileinfo, 'co')
plt.show()