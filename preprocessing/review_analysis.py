
import pandas as pd
import numpy as np
from transformers import pipeline

# 감정 분석 파이프라인 불러오기
classifier = pipeline("sentiment-analysis")

df = pd.read_csv("/home/sunghun20243522/worksp/BLEP2025/datasets/UCI_ML_Drug_Review_dataset/drugsComTest_raw.csv")

data = df[["drugName", "condition", "review"]]

print(data.head())

reviews = data['review']

results = classifier(reviews.tolist(), truncation=True)

data['sentiment'] = [result['label'] for result in results]
data['sentiment_score'] = [result['score'] for result in results]

data.to_csv("./new_data.csv", index=False)
