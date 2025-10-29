import pandas as pd
import numpy as np

df = pd.read_csv("/home/sunghun20243522/worksp/BLEP2025/preprocessing/dataset/merged_data.csv")

print(df.isnull().sum())
print(df.info)
print(df.tail())