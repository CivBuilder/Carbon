import json
import requests
import csv

import os
script_dir = os.path.dirname(__file__)  # Script directory
fileNames = os.path.join(script_dir, 'data/file_rootbeer.csv')
lstTokens = ["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"]
repo = 'scottyab/rootbeer'



# GitHub Authentication function
def github_auth(url, lsttoken, ct):
    jsonData = None
    try:
        ct = ct % len(lstTokens)
        headers = {'Authorization': 'Bearer {}'.format(lsttoken[ct])}
        request = requests.get(url, headers=headers)
        jsonData = json.loads(request.content)
        ct += 1
    except Exception as e:
        pass
        print(e)
    return jsonData, ct

file = repo.split('/')[1]
# change this to the path of your file
fileOutput = 'data/namedate_' + file + '.csv'
rows = ["Filename", "Author", "Date"]
fileCSV = open(fileOutput, 'w')
writer = csv.writer(fileCSV)
writer.writerow(rows)

with open(fileNames, 'r') as fileNames:
    ct = 0
    datareader = csv.reader(fileNames)
    for row in datareader:
        path = row[0]
        shaUrl = 'https://api.github.com/repos/' + repo + '/commits?path=' + path
        shaDetails, ct = github_auth(shaUrl, lstTokens, ct)
        print(path + '\n')
        for s in shaDetails:
            name = s['commit']['author']['name']
            date = s['commit']['author']['date']
            row = [path, name, date]
            print(row)
            writer.writerow(row)
    fileCSV.close()        
    
    