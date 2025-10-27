# BLEP_2025
BLEP (Bigdata-based Living Lab Education Platform) contest of practicing big data

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)



## 📖 개요 (Description)


---

## ✨ 주요 기능 (Features)



---

## 🛠️ 설치 (Installation)

이 프로젝트를 로컬 환경에서 실행하기 위한 설치 가이드입니다.

### 1. 전제 조건 (Prerequisites)

* Python 3.9 이상
* (권장) `conda` 또는 `venv` 가상 환경

### 2. 설치 단계

1.  **리포지토리 클론:**
    ```bash
    git clone https://github.com/sunghun05/BLEP_2025.git
    ```

2.  **가상 환경 생성 및 활성화:**
    ```bash
    # (방법 1) Python venv 사용 (권장)
    python -m venv venv
    
    # macOS / Linux
    source venv/bin/activate
    
    # Windows
    .\venv\Scripts\activate
    ```
    ```bash


3.  **필요한 패키지 설치:**

    **(A) `requirements.txt` 사용 (pip)**

    아래 내용을 `requirements.txt` 파일로 저장한 후, 다음 명령어를 실행하세요.

    ```bash
    pip install -r requirements.txt
    ```

    **(B) `conda` 사용 (RDKit 권장)**

    `rdkit`는 `conda` (특히 `conda-forge` 채널)로 설치하는 것이 가장 안정적입니다.

    ```bash
    conda install -c conda-forge pandas matplotlib seaborn
    ```
    *(위 명령은 주요 패키지를 설치하며, 나머지 패키지는 pip로 추가 설치할 수 있습니다.)*

