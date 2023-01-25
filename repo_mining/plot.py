import csv
import matplotlib.pyplot as plt
import os
import numpy as np
import random


def calcDiff(newer, older):
    value = newer[1] - older[1]
    value *= 12
    value += newer[0] - older[0]
    return value

if not os.path.exists("data"):
    print("add a data folder")
    exit(0)

file = "rootbeer" #change this to anything that is in data . EX file_test.csv replace rootbeer with test
#file = "backpack" #for backpack :)
fileInput = 'data/author_time_' + file + '.csv'
dateDecoded = {}
smallest = None
newest = None
with open(fileInput, "r") as infile: #open the file
    reader = csv.reader(infile) #make the reader object

    next(reader) #skip  header

    for row in reader: #for every row
        date = row[1]
        year = ""
        findYear = True
        month = ""

        for i in date:
            if i == "-":
                if findYear is False:
                    break
                findYear = False
                continue
            if findYear:
                year = year + i
            else:
                month = month + i
        
        dateDecoded[date] = (int(month), int(year))
        pair = dateDecoded[date]
        if smallest is None:
            smallest = date
        else: 
            oldSmall = dateDecoded[smallest]
            if oldSmall[1] > pair[1]: #if old year is later then new year
                smallest = date
            elif oldSmall[1] == pair[1]: #if same year
                if oldSmall[0] > pair[0]: #if new month is older then old smallest
                    smallest = date
        if newest is None:
            newest = date
        else:
            oldNewest = dateDecoded[newest]
            if oldNewest[1] < pair[1]: #if old year is older then new year:
                newest = date
            elif oldNewest[1] == pair[1]:
                if oldNewest[0] < pair[0]:
                    newest = date
            


dictL = {} # list of names
files = {}

with open(fileInput, "r") as infile: #open the file
    reader = csv.reader(infile) #make the reader object

    next(reader) #skip header

    for row in reader: #for every row
        if row[0] not in dictL:
            dictL[row[0]] = []
        dictL[row[0]].append((dateDecoded[row[1]],row[2]))        
        files[row[2]] = 1
 

difference = calcDiff(dateDecoded[newest], dateDecoded[smallest]) #difference between largest and smallest value in months
plt.xlim(-.5, len(files))  #x limit is the amount of files
plt.ylim(-5, difference + (difference*.20)) #y limit is the difference in months

colorList = {}
tracker = 0 # tracker for file
for key in files:
    files[key] =tracker
    tracker += 1

for key in dictL:
    color = (np.random.random(), np.random.random(), np.random.random())
    notDoneYet = True
    for value in dictL[key]:
        xVal = files[value[1]] #this is the value of the file assigned to a number
        yVal = calcDiff(value[0], dateDecoded[smallest])
        if notDoneYet:
            plt.plot(xVal, yVal, marker="o", markersize=6, c=color, label=key)
            notDoneYet = False
            continue

        plt.plot(xVal, yVal, marker="o", markersize=6, c=color)

plt.legend(loc="upper right")
plt.xlabel("File #")
plt.ylabel("Month's since start")

plt.show()


