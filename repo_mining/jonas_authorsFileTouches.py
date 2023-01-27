import csv
import json

import os

if not os.path.exists("data"):
    print("add a data folder")
    exit(0)

file = "rootbeer" #change this to anything that is in data . EX file_test.csv replace rootbeer with test
#file = "backpack" #for backpack :)
fileInput = 'data/file_' + file + '.csv'
authors = []
with open(fileInput, "r") as infile: #open the file
    reader = csv.reader(infile) #make the reader object

    next(reader) #

    for row in reader: #for every row
        fileName = row[0]
        test = row[1].replace("[", "") #clean up the input
        test = test.replace("]", "")

        test = test.replace("'", "")
        test = test.replace(" ", "")

        test = test.split(",")
        i = 0
        while i < len(test):

            authors.append((test[i], test[i+1], fileName))
           
            i+=2


fileOutput = 'data/author_time_' + file + '.csv'

with open(fileOutput, "w", newline='') as outfile: #open the outputfile
    writer = csv.writer(outfile)
    # Write the header row
    writer.writerow(["Author", "Time", "Filename"])
    # Write the data rows
    for item in authors:
        writer.writerow(item)
