package com.ul88.blep.dto;

import com.opencsv.bean.AbstractBeanField;
import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvCustomBindByName;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
public class DrugDto {
    @CsvCustomBindByName(column = "drugName", converter = NaNConverter.class)
    private String drugName;
    @CsvCustomBindByName(column = "condition", converter = NaNConverter.class)
    private String condition;
    @CsvCustomBindByName(column = "review", converter = NaNConverter.class)
    private String review;
    @CsvCustomBindByName(column = "sentiment", converter = NaNConverter.class)
    private String sentiment;
    @CsvCustomBindByName(column = "sentiment_score", converter = NaNConverter.class)
    private String sentimentScore;
    @CsvCustomBindByName(column = "medical_condition", converter = NaNConverter.class)
    private String medicalCondition;
    @CsvCustomBindByName(column = "side_effects", converter = NaNConverter.class)
    private String sideEffects;
    @CsvCustomBindByName(column = "generic_name", converter = NaNConverter.class)
    private String genericName;
    @CsvCustomBindByName(column = "drug_classes", converter = NaNConverter.class)
    private String drugClasses;
    @CsvCustomBindByName(column = "brand_names", converter = NaNConverter.class)
    private String brandNames;
    @CsvCustomBindByName(column = "activity", converter = NaNConverter.class)
    private String activity;
    @CsvCustomBindByName(column = "rx_otc", converter = NaNConverter.class)
    private String rxOtc;
    @CsvCustomBindByName(column = "pregnancy_category", converter = NaNConverter.class)
    private String pregnancyCategory;
    @CsvCustomBindByName(column = "csa", converter = NaNConverter.class)
    private String csa;
    @CsvCustomBindByName(column = "alcohol", converter = NaNConverter.class)
    private String alcohol;
    @CsvCustomBindByName(column = "rating", converter = NaNConverter.class)
    private String rating;
    @CsvCustomBindByName(column = "drug_link", converter = NaNConverter.class)
    private String drugLink;
    @CsvCustomBindByName(column = "medical_condition_url", converter = NaNConverter.class)
    private String medicalConditionUrl;

    public static class NaNConverter extends AbstractBeanField<String, String> {
        @Override
        protected Object convert(String value) {
            if (value == null || value.isEmpty()) {
                return "NaN";
            }
            return value;
        }
    }

}
