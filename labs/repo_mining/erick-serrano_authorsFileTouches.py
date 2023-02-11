import json
import requests
import csv
from collections import defaultdict
from datetime import datetime
import pandas as pd
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
def countfiles(dictfiles, lsttokens, repo):
    ipage = 1  # url page counter
    ct = 0  # token counter

    try:
        # loop though all the commit pages until the last returned empty page
        while True:
            spage = str(ipage)
            commitsUrl = 'https://api.github.com/repos/' + repo + '/commits?page=' + spage + '&per_page=100'
            jsonCommits, ct = github_auth(commitsUrl, lsttokens, ct)
            # break out of the while loop if there are no more commits in the pages
            if len(jsonCommits) == 0:
                break
            # iterate through the list of commits in  page
            for shaObject in jsonCommits:
                # We must ensure that all files we check are "source files."
                # I will interpret source files as files with the following extensions:
                # .java, .class, .dpj, .jar, .js,.jsp,.xrb
                # I chose these extensions because we are investigating a
                # java-based repository
                valid_ext = {".java",".class",".dpj",".jar",".js",".jsp",".xrb"}
                author = shaObject['commit']['author']['name']
                date = shaObject['commit']['author']['date']
                sha = shaObject['sha']

                # For each commit, use the GitHub commit API to extract the files touched by the commit
                shaUrl = 'https://api.github.com/repos/' + repo + '/commits/' + sha
                shaDetails, ct = github_auth(shaUrl, lsttokens, ct)
                filesjson = shaDetails['files']
                for filenameObj in filesjson:
                    filename = filenameObj['filename']

                    file_verif = filename.split(".")[-1]
                    if ("." + file_verif not in valid_ext):
                        print("File not a valid extension ." + file_verif)
                        continue
                    print("File is a valid extension: ")
                    dictfiles[filename].append((author,date))

                    print(filename)
            ipage += 1
    except:
        print("Error receiving data")
        exit(0)
# GitHub repo
repo = 'scottyab/rootbeer'
# repo = 'Skyscanner/backpack' # This repo is commit heavy. It takes long to finish executing
# repo = 'k9mail/k-9' # This repo is commit heavy. It takes long to finish executing
# repo = 'mendhak/gpslogger'

lstTokens = [""]

dictfiles = defaultdict(list)
countfiles(dictfiles, lstTokens, repo)
print('Total number of files: ' + str(len(dictfiles)))


df = pd.DataFrame.from_dict(dictfiles,orient='index')
df = df.transpose()
df.to_csv('data/file_rootbeer.csv')
