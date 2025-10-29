package com.ul88.blep.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ResponseFindByCondition {
    private String drugName;

    private String condition;

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

    private Long positiveCount;

    private Long negativeCount;

    public ResponseFindByCondition(DrugDto dto, Long positiveCount, Long negativeCount){
        drugName = dto.getDrugName();
        condition = dto.getCondition();
        medicalCondition = dto.getMedicalCondition();
        sideEffects = dto.getSideEffects();
        genericName = dto.getGenericName();
        drugClasses = dto.getDrugClasses();
        brandNames = dto.getBrandNames();
        activity = dto.getActivity();
        rxOtc = dto.getRxOtc();
        pregnancyCategory = dto.getPregnancyCategory();
        csa = dto.getCsa();
        alcohol = dto.getAlcohol();
        rating = dto.getRating();
        this.positiveCount = positiveCount;
        this.negativeCount = negativeCount;
    }
}
