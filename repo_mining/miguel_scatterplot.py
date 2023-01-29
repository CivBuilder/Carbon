from matplotlib import pyplot as plt
import csv
import numpy as np
from datetime import datetime as dt

### Read data from csv file
repo = 'scottyab/rootbeer'
file = repo.split('/')[1]
fileOutput = 'data/authorFileTouch_' + file + '.csv'

csv_input = []
authorArr = []
dataArr = []
with open(fileOutput, 'r') as file:
    csv_file = csv.DictReader(file)
    for row in csv_file:
        csv_input.append(dict(row))

authorArr = [arr['Author'] for arr in csv_input]
dataArr = [arr['Data'] for arr in csv_input]

for i in range(len(dataArr)):
    dataArr[i] = dataArr[i].replace('[','')
    dataArr[i] = dataArr[i].replace(']','')
    dataArr[i] = dataArr[i].replace(' ','')
    dataArr[i] = dataArr[i].replace('\'','')

    files = []
    dates = []

    dataFormat = dataArr[i].split(',')
    for j in range(len(dataFormat)):
        if(j % 2):
            dates.append(dataFormat[j])
        else:
            files.append(dataFormat[j])
    
    for k in range(len(files)):
        files[k] = files[k].split('/')[-1]
    print(files)

    # Organize dates to be weeks from today
    for l in range(len(dates)):
        dates[l] = (dt.now().date() - dt.strptime(dates[l],'%Y-%m-%dT%H:%M:%SZ').date()).days//7

    plt.scatter(files,dates,s=10,label=authorArr[i])
    plt.annotate(authorArr[i], (files[0],dates[0]), fontsize=10)

plt.title('Files vs. Commits')                                  # Add the title
plt.xlabel('File Name')                                         # Add the x-axis label 
plt.ylabel('Date of Commit Since Today (Weeks)')                # Add the y-axis label
plt.legend(bbox_to_anchor=(1.01, 1.0), loc="upper left", title = "Contributors", fontsize=10)
plt.tick_params(axis='x', which='major', labelsize=5)           # Set the x-axis label size
plt.tick_params(axis='y', which='major', labelsize=10)          # Set the y-axis label size
plt.xticks(rotation=70)                                         # Rotate the x-axis labels
plt.show()