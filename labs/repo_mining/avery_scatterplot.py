from cProfile import label
from turtle import title
import matplotlib.pyplot as plt
import csv
import numpy as np
from datetime import datetime

#get that csv
input = []

with open("data/avery_file_rootbeer.csv", 'r') as file: 
    csv_file = csv.DictReader(file)
    for row in csv_file:
        input.append(dict(row))

#gets raw dates from csv
authors = [x['Author'] for x in input]

#gets everything else from csv
data = [x['Data'] for x in input]

#cleans the raw data 
for i in range(len(data)):
    data[i] = data[i].replace('[','')
    data[i] = data[i].replace(']','')
    data[i] = data[i].replace(' ','')
    data[i] = data[i].replace('\'','')
    x = []
    y = []

    #splits big data into date/file path
    big = data[i].split(',')
    for l in range(len(big)):
        if(l%2):
            y.append(big[l])
        else:
            x.append(big[l])

    #gets currennt date
    current = datetime.now().date()
    #gets just file names 
    for a in range(len(x)):
        x[a] = x[a].replace("app/src/main/java/com/scottyab/rootchecker/","")
        x[a] = x[a].replace("app/src/main/java/com/scottyab/rootbeer/sample/","")
        x[a] = x[a].replace("rootbeerlib/src/main/java/com/scottyab/rootbeer/","")
        x[a] = x[a].replace("rootbeerlib/src/androidTest/java/com/scottyab/rootbeer/","")
        x[a] = x[a].replace("rootbeerlib/src/test/java/com/scottyab/rootbeer/","")
        x[a] = x[a].replace("app/src/androidTest/java/com/scottyab/rootbeer/","")
        x[a] = x[a].replace("util/","")
        x[a] = x[a].replace("app/src/androidTest/java/com/scottyab/rootchecker/","")
        x[a] = x[a].replace(".java","")
        
    #organizes dates to be weeks from today 
    for j in range(len(y)):
        y[j] = datetime.strptime(y[j],'%Y-%m-%dT%H:%M:%SZ')
        y[j] = y[j].date()
        y[j] = (current-y[j]).days//7

    plt.scatter(x,y,s=10,label=authors[i])
    plt.tick_params(axis='x', labelsize = 3.8)

#how to use plt lol 
plt.xlabel("Files")
plt.ylabel("Weeks From Today")
plt.legend(loc="lower right", title = "Contributers", fontsize=4)
plt.show()
