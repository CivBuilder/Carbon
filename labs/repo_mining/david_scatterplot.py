import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime
file = pd.read_csv('data/namedate_rootbeer.csv')
    
filename = file['Filename']
author = file['Author']

#week conversion
date = file['Date'].tolist()
weeks = []
dates = [datetime.strptime(date, '%Y-%m-%dT%H:%M:%SZ') for date in date]
for d in dates:
    yr = d.year
    week = int(d.strftime('%U'))
    if yr == 2017:
        week += 52
    if yr == 2018:
        week += 104
    if yr == 2019:
        week += 156
    if yr == 2020:
        week += 208
    if yr == 2021:
        week += 260
    weeks.append(week)

#map a color number to each author
colors = {author: i for i, author in enumerate(set(author))}

#map a number to each file
files = {filename: i for i, filename in enumerate(set(filename))}

#plot
fig, ax = plt.subplots()
ax.locator_params(integer=True)

for filename, author, weeks in zip(filename, author, weeks):
    ax.scatter(files[filename], weeks, colors[author])
plt.xticks(range(len(files)))
plt.xlabel('file')
plt.ylabel('week')
plt.show()