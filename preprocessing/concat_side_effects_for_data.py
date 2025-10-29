import pandas as pd
import numpy as np


df_sem = pd.read_csv('/home/sunghun20243522/worksp/BLEP2025/preprocessing/dataset/new_data.csv')
df_sideEffects = pd.read_csv('/home/sunghun20243522/worksp/BLEP2025/datasets/Drugs_Side_Effects_And_Medical_Condition/drugs_side_effects_drugs_com.csv')



print(df_sem.head())
print(df_sideEffects.head())

df_sem['drugName'] = df_sem['drugName'].str.lower()
df_sideEffects['drug_name'] = df_sideEffects['drug_name'].str.lower()

df_merged = pd.merge(df_sem, df_sideEffects, left_on='drugName', right_on='drug_name', how='left')

print(df_merged.head())

df_merged.to_csv('merged_data.csv', index=False, encoding='utf-8-sig')