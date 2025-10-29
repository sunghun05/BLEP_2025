package com.ul88.blep.dto;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Builder
@Data
public class Page {
    private List<ResponseFindByCondition> list;

    public ResponseDrugDto getLists(int page, int page_size){
        List<ResponseFindByCondition> ret = new ArrayList<>();
        int offset = (page-1)*page_size;

        for(int i=0;i<page_size;i++){
            if(list.size() <= offset + i) break;
            ret.add(list.get(offset+i));
        }

        List<ResponseFindByCondition> sortedList = ret.stream()
                .sorted(Comparator.comparing(ResponseFindByCondition::getPositiveCount, Comparator.nullsLast(Long::compareTo)).reversed())
                .toList();

        return ResponseDrugDto.builder()
                .drug(sortedList)
                .count(ret.size())
                .nowPage(page)
                .endPage(list.size() / page_size + (list.size() % page_size == 0 ? 0 : 1))
                .build();
    }
}
