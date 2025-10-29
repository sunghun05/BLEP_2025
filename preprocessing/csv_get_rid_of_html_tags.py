import pandas as pd
from bs4 import BeautifulSoup
import numpy as np

# --- 1. 원본 CSV 파일 읽기 (가정) ---
# 예제를 위해 여기서는 DataFrame을 직접 생성합니다.

df = pd.read_csv(
    "/home/sunghun20243522/worksp/BLEP2025/preprocessing/dataset/merged_data.csv"
)

print("--- 1. 원본 DataFrame (변환 전) ---")
print(df)

print(df.columns)
# --- 2. BeautifulSoup을 사용해 HTML 태그 제거 ---

# HTML 태그를 텍스트로 변환하는 함수
def html_to_text(text):
    if isinstance(text, str):
        # BeautifulSoup 객체를 생성하고 .get_text()로 텍스트만 추출
        soup = BeautifulSoup(text, "html.parser")
        return soup.get_text()
    else:
        # NaN 값 등 문자열이 아닌 경우 그대로 반환
        return text

# 변환을 적용할 열들을 리스트로 지정
columns_to_clean = ['drugName', 'condition', 'review', 'sentiment', 'sentiment_score',
       'drug_name', 'medical_condition', 'side_effects', 'generic_name',
       'drug_classes', 'brand_names', 'activity', 'rx_otc',
       'pregnancy_category', 'csa', 'alcohol', 'related_drugs',
       'medical_condition_description', 'rating', 'no_of_reviews', 'drug_link',
       'medical_condition_url']

for col in columns_to_clean:
    df[col] = df[col].apply(html_to_text)

print("\n--- 2. HTML 태그 제거 후 DataFrame ---")
print(df)


# --- 3. 정제된 DataFrame을 CSV 파일로 저장 ---
file_name = 'cleaned_data.csv'

df.to_csv(
    file_name,
    index=False,        # 엑셀에서 불필요한 인덱스 열이 생기는 것을 방지
    encoding='utf-8-sig'  # 한글 깨짐 방지 (BOM 포함 UTF-8)
)

print(f"\n--- 3. '{file_name}'으로 저장 완료 ---")