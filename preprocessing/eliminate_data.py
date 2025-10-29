import pandas as pd
import numpy as np

# 1. 원본 DataFrame (위 예제 df 사용)
print("--- 원본 DataFrame ---")
df = pd.read_csv("/home/sunghun20243522/worksp/BLEP2025/cleaned_data.csv")

print(df)

# 2. 모든 'object' (문자열) 타입 열을 선택하여 반복
for col in df.select_dtypes(include=['object']).columns:
    print(f"'{col}' 열에서 '\"\"\"' 제거 중...")
    df[col] = df[col].str.replace('"', '', regex=False)

print("\n--- 모든 문자열 열 처리 후 ---")
print(df)

dfN = df.drop(columns='drug_name')

dfN.to_csv('eliminated_data.csv', index=False, encoding='utf-8-sig')