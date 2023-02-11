import json
import requests
import csv
import os
from datetime import datetime

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
def countfiles(dictauthors, lsttokens, repo):
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
            # iterate through the list of commits in spage
            for shaObject in jsonCommits:
                sha = shaObject['sha']
                # For each commit, use the GitHub commit API to extract the files touched by the commit
                shaUrl = 'https://api.github.com/repos/' + repo + '/commits/' + sha
                shaDetails, ct = github_auth(shaUrl, lsttokens, ct)

                #Each shaDetails contains the author, date, and the files touched by the commit
                authorNameDate = shaDetails['commit']['author']
                # for commitObj in commitjson:
                author = authorNameDate['name'] # Author name
                date = authorNameDate['date'] # Date format is YYYY-MM-DDTHH:MM:SSZ
                dateFormat = datetime.strptime(date, '%Y-%m-%dT%H:%M:%SZ') # Convert to datetime object
                dateFormat = dateFormat.strftime('%B %d, %Y %H:%M:%S') # Convert to string in Month Day, Year Hour:Minute:Second format
                print(author, date)

                filesjson = shaDetails['files'] # Gets the files touched by the commit
                for filenameObj in filesjson: # Iterate through the files touched by the commit
                    if ".java" in filenameObj['filename']: # Only get the files that are .java files
                        filename = filenameObj['filename'] # Gets the filename of the file touched by the commit
                        print('\t', filename) # Print the filename
                        
                        # Add the tuple (filename, date) to the dictionary of authors
                        dictauthors[author] = dictauthors.get(author, []) + [filename]+[date]
            ipage += 1 # Increment the page counter
    except:
        print("Error receiving data")
        exit(0)


# GitHub repo
repo = 'scottyab/rootbeer'
# repo = 'Skyscanner/backpack' # This repo is commit heavy. It takes long to finish executing
# repo = 'k9mail/k-9' # This repo is commit heavy. It takes long to finish executing
# repo = 'mendhak/gpslogger'


# put your tokens here
# Remember to empty the list when going to commit to GitHub.
# Otherwise they will all be reverted and you will have to re-create them
# I would advise to create more than one token for repos with heavy commits
lstTokens = [""]

# dictfiles = dict()
dictauthors = dict()
countfiles(dictauthors, lstTokens, repo)

if not os.path.exists("data"):
 os.makedirs("data")

file = repo.split('/')[1]
# change this to the path of your file
fileOutput = 'data/miguel_' + file + '.csv'
rows = ["Author", "Data"]
fileCSV = open(fileOutput, 'w')
writer = csv.writer(fileCSV)
writer.writerow(rows)

# Write the dictionary to a csv file
for author, data in dictauthors.items():
    rows = [author, data]
    writer.writerow(rows)
fileCSV.close()