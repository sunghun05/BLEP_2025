package com.ul88.blep.dto;

import com.opencsv.bean.CsvCustomBindByName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ResponseDrugOneData {

    private String drugName;

    private List<String> condition;

    private String medicalCondition;

    private String sideEffects;

    private String genericName;

    private String drugClasses;

    private String brandNames;

    private String activity;

    private String rxOtc;

    private String pregnancyCategory;

    private String csa;

    private String alcohol;

    private String rating;

    private List<String> positiveReviews;
    private List<String> negativeReviews;
    private Integer positiveReviewsSize;
    private Integer negativeReviewsSize;

    public static ResponseDrugOneData toDrugDto(DrugDto dto, List<String> conditionLists, List<String> positiveReviews, List<String> negativeReviews){
        return ResponseDrugOneData.builder()
                .drugName(dto.getDrugName())
                .condition(conditionLists)
                .medicalCondition(dto.getMedicalCondition())
                .sideEffects(dto.getSideEffects())
                .genericName(dto.getGenericName())
                .drugClasses(dto.getDrugClasses())
                .brandNames(dto.getBrandNames())
                .activity(dto.getActivity())
                .rxOtc(dto.getRxOtc())
                .pregnancyCategory(dto.getPregnancyCategory())
                .csa(dto.getCsa())
                .alcohol(dto.getAlcohol())
                .rating(dto.getRating())
                .positiveReviews(positiveReviews)
                .negativeReviews(negativeReviews)
                .positiveReviewsSize(positiveReviews.size())
                .negativeReviewsSize(negativeReviews.size())
                .build();
    }
}
