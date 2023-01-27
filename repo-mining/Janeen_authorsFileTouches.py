import json
import requests
import csv

import os

if not os.path.exists("data"):
 os.makedirs("data")

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

# @dictFiles, empty dictionary of files
# @lstTokens, GitHub authentication tokens
# @repo, GitHub repo
def getAuthorDate(dictfiles, lsttokens, repo):
    ct = 0  # token counter

#   Open csv file to write author and date data to
    fileOutput = 'data/file_authors.csv'
    rows = ["Filename", "FileNumber", "Author", "Date", "Month", "AuthorNumber"]
    fileCSV = open(fileOutput, 'w')
    writer = csv.writer(fileCSV)
    writer.writerow(rows)

    csvfile = open("/home/janeen/cs472/cs472project/repo-mining/data/file_rootbeer.csv", "r")
    csv_reader = csv.reader(csvfile, delimiter=",")
    line_count = 0
    author_count = 1
    authors = {}

    for row in csv_reader:
        if line_count == 0:
            line_count += 1
            continue
        commitsUrl = 'https://api.github.com/repos/' + repo + '/commits?path=' + row[0]
        jsonCommits, ct = github_auth(commitsUrl, lsttokens, ct)

        for shaObject in jsonCommits:
            author = shaObject['commit']['author']['name']
            date = shaObject['commit']['author']['date']
            month = date[5:7]
            if author not in authors:
                authors[author] = author_count
                author_count += 1
            writer.writerow([row[0], line_count, author, date, month, authors[author]])
        line_count += 1
    fileCSV.close()

   
# GitHub repo
repo = 'scottyab/rootbeer'
# repo = 'Skyscanner/backpack' # This repo is commit heavy. It takes long to finish executing
# repo = 'k9mail/k-9' # This repo is commit heavy. It takes long to finish executing
# repo = 'mendhak/gpslogger'


# put your tokens here
# Remember to empty the list when going to commit to GitHub.
# Otherwise they will all be reverted and you will have to re-create them
# I would advise to create more than one token for repos with heavy commits
lstTokens = []

dictfiles = dict()
getAuthorDate(dictfiles, lstTokens, repo)
