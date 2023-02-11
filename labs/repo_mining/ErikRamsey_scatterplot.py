from datetime import datetime
import matplotlib.pyplot as plt
import json
import os
import random

repo = 'rootbeer.json'
commits = None
with open(repo, 'r') as infile:
    try:
        commits = json.load(infile)
    except Exception as e:
        print(e)
        
x = []
y = []
colors = []
for author in commits.items():
    color = (random.random(), random.random(), random.random())
    for file in author[1]:
        if file[0].endswith(('.java', '.ky', '.cpp', '.h')):
            x.append(datetime.strptime(file[1], '%Y-%m-%dT%H:%M:%SZ'))
            y.append(os.path.basename(file[0]))
            colors.append(color)

plt.scatter(x, y, c=colors, s=50)

plt.show()