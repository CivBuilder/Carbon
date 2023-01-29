import csv
import time
from calendar import timegm
import os
import numpy as np
import matplotlib.pyplot as plt

if not os.path.exists("data"):
 os.makedirs("data")

repo = "rootbeer"
fileInput = './data/adam-velardib_' + repo + '_authorTouchesFile.csv'

def dateToWeeks(date):
  utc = time.strptime(date, "%Y-%m-%dT%H:%M:%SZ")
  epoch = timegm(utc)
  weeks = epoch/604800
  weeks = int(weeks)
  return weeks

weekRange = []
colors = {}
dataPoints = {}
files = {}
fileCounter = 0
weekRecent = 0
weekEarliest = 0

infileCSV = open(fileInput, 'r')
reader = csv.reader(infileCSV)
next(reader)
for row in reader:
  if row:
    weekRange.append(dateToWeeks(row[1]))
    if row[2] not in files:
      files[row[2]] = fileCounter
      fileCounter+=1
    if row[0] not in dataPoints:
      dataPoints[row[0]] = []
      colors[row[0]] = (np.random.random(), np.random.random(), np.random.random())
    dataPoints[row[0]].append((files[row[2]], dateToWeeks(row[1])))
infileCSV.close()

weekRange.sort()
weekEarliest = weekRange[-1]-weekRange[0]

plt.xlim(-.5, len(files))
plt.ylim(weekRecent, weekEarliest+2)
for key in dataPoints:
  for value in dataPoints[key]:
    plt.plot(value[0], value[1]%weekEarliest, marker="o", markersize=8, c=colors[key], label=key)
plt.xlabel("Files")
plt.ylabel("Weeks")
plt.show()