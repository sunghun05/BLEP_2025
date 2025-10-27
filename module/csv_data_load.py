import pandas


class DataLoader():
    def __init__(self) -> None:
        pass

    def dataLoad(self, fileDir: str) -> pandas.DataFrame:
        data = pandas.read_csv(fileDir)
        self.dataset = data
        return data

    def dataRead(self) -> None:
        if hasattr(self, 'dataset') and self.dataset is not None:
            print(self.dataset.all())
        else:
            print("No dataset loaded. Please call dataLoad() first.")


if __name__ == "__main__":
    associatedpress_opioid_prescriptions_2010_2015 = DataLoader()
    associatedpress_opioid_prescriptions_2010_2015.\
    dataLoad("/home/sunghun20243522/worksp/BLEP2025/datasets/associatedpress-opioid-prescriptions-2010-2015/data/opioid_prescription_amounts.csv")

    associatedpress_opioid_prescriptions_2010_2015.dataRead()
