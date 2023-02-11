import csv

import os

if not os.path.exists("data"):
 os.makedirs("data")

repo = "rootbeer"
fileInput = './data/adam-velardib_' + repo + 'File.csv'
fileOutput = './data/adam-velardib_' + repo + '_authorTouchesFile.csv'

infileCSV = open(fileInput, 'r')
authors = []
reader = csv.reader(infileCSV)
for row in reader:
  if row:
    if "Filename" not in row[0]:
      filename = row[0]
      touchList = row[1]
      removeChars = ["[", "]", " ", "'"]
      for char in removeChars:
        touchList = touchList.replace(char, "")
      touchList = touchList.split(",")
      for i in range(0, len(touchList), 2):
        authors.append((touchList[i], touchList[i+1], filename))
infileCSV.close()

outfileCSV = open(fileOutput, 'w')
writer = csv.writer(outfileCSV)
writer.writerow(["Author", "Date", "Filename"])
for entry in authors:
  writer.writerow(entry)
outfileCSV.close()

