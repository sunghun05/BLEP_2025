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
public class ResponseDrugDto {
    private List<ResponseFindByCondition> drug;
    private int count;
    private int nowPage;
    private int endPage;
}
