import json
import requests
import csv
import datetime as dt

import os

#used for checking if extension is a source file as compared to a config one 
Valid_Ext_List = (

    # Java
    ".java",

    # #Kotlin
    # ".kts",

    # # C and C++
    # ".c",
    # ".C",
    # ".cc",
    # ".cpp",
    # ".c++",
    # ".cxx",
    # ".h",
    # ".H",
    # ".h++",
    # ".hh",
    # ".hxx",
    # ".hpp",


    # #CSS
    # ".css",
    # ".scss",
    
    # #javascript
    # ".js",
)

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
def countfiles(dictfiles,dictfileTouches, lsttokens, repo):
    ipage = 1  # url page counter
    ct = 0  # token counter

# loop though all the commit pages until the last returned empty page
    while True:
        spage = str(ipage)
        commitsUrl = 'https://api.github.com/repos/' + repo + '/commits?page=' + spage + '&per_page=100'
        jsonCommits, ct = github_auth(commitsUrl, lsttokens, ct)

        # break out of the while loop if there are no more commits in the pages
        if len(jsonCommits) == 0:
            break
        # iterate through the list of commits in  spage
        for shaObject in jsonCommits:
            sha = shaObject['sha']
            # For each commit, use the GitHub commit API to extract the files touched by the commit
            shaUrl = 'https://api.github.com/repos/' + repo + '/commits/' + sha
            shaDetails, ct = github_auth(shaUrl, lsttokens, ct)
            
            #store share details data
            filesjson = shaDetails['files']
            author_name = shaDetails['commit']['author']['name']
            date = shaDetails['commit']['author']['date']



            for filenameObj in filesjson:
                filename = filenameObj['filename']

                # add to list only if the extension is found
                for ext in Valid_Ext_List:
                    if filename.endswith(ext) == True:
                        print(filename)
                        if dictfiles.get(filename) == None:
                            dictfiles[filename] = []

                        dictfiles[filename].append((author_name, dt.datetime.strptime(date, '%Y-%m-%dT%H:%M:%SZ')))
                        dictfileTouches[filename] = dictfileTouches.get(filename, 0) + 1

        ipage += 1





# GitHub repo
repo = 'scottyab/rootbeer'
#repo = 'Skyscanner/backpack' # This repo is commit heavy. It takes long to finish executing
# repo = 'k9mail/k-9' # This repo is commit heavy. It takes long to finish executing
# repo = 'mendhak/gpslogger'


# put your tokens here
# Remember to empty the list when going to commit to GitHub.
# Otherwise they will all be reverted and you will have to re-create them
# I would advise to create more than one token for repos with heavy commits
lstTokens = ["dummy_token"]



def collectAuthorsAndFileTouches():


    dictfiles = dict()
    dictfileTouches = dict()
    countfiles(dictfiles, dictfileTouches, lstTokens, repo)
    print('Total number of files: ' + str(len(dictfiles)))



    # change this to the path of your file
    file = repo.split('/')[1]
    fileOutput = 'data/file_' + file + '.csv'
    rows = ["Filename", "Touches"]
    fileCSV = open(fileOutput, 'w')
    writer = csv.writer(fileCSV)
    writer.writerow(rows)


    #Write Touches to CSV file 
    bigcount = None
    bigfilename = None
    for filename, count in dictfileTouches.items():
        rows = [filename, count]
        writer.writerow(rows)
        if bigcount is None or count > bigcount:
            bigcount = count
            bigfilename = filename
    fileCSV.close()
    print('The file ' + bigfilename + ' has been touched ' + str(bigcount) + ' times.')


    #return values for plotting 
    repo_start_date = min([n[1] for list in dictfiles.values() for n in list])
    return dictfiles, repo_start_date, repo



# only collect the data and post the file if this is the main file being executed
if __name__ == "__main__":
    collectAuthorsAndFileTouches()
