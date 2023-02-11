import matplotlib.pyplot as plt
import numpy as np
import datetime as dt
from Angel_Quintanilla_authorsFileTouches import collectAuthorsAndFileTouches




#get mapping of file creation dates 
dictFiles, repo_creation_date, repo = collectAuthorsAndFileTouches()

# get authors
authors = list({ n[0] for pairs in dictFiles.values() for n in pairs})

x,y,colors,i = [],[],[],0 #containers for graph and index i

for fileName, list_of_tuples in dictFiles.items():
   x = x + ([i]*len(list_of_tuples))
   i += 1
   for tuple in list_of_tuples: 

        #add the week as our y_axis
        commit_date = tuple[1]
        weeks_since_start = (commit_date - repo_creation_date).days / 7 
        y.append(weeks_since_start)

        #add the color 
        colors.append(authors.index(tuple[0]))


plt.scatter(x,y, c=colors)
plt.title(f"Commit History for {repo}")
plt.legend()
plt.xlabel("File No.")
plt.ylabel("No. of weeks since project creation")
plt.show();
