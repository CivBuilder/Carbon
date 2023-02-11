import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("data/file_authors.csv")
plt.scatter(df['FileNumber'], df['Month'], c=df['AuthorNumber'])
plt.xlabel("File")
plt.ylabel("Month")
plt.show()
