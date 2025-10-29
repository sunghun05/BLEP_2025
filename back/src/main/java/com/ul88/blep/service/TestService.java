package com.ul88.blep.service;

import com.opencsv.bean.CsvToBeanBuilder;
import com.ul88.blep.dto.*;
import lombok.Getter;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStreamReader;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Log4j2
public class TestService {
    public List<DrugDto> drugDtoList;

    @Getter
    public List<String> conditionList = new ArrayList<>();
    @Getter
    public List<String> drugNameList = new ArrayList<>();

    public TestService() {
        try {
            ClassPathResource resource = new ClassPathResource("static/eliminated_data.csv");
            drugDtoList = new CsvToBeanBuilder<DrugDto>(new InputStreamReader(resource.getInputStream()))
                    .withType(DrugDto.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();

            conditionList.addAll(drugDtoList.stream()
                    .map(DrugDto::getCondition)
                    .distinct()
                    .toList());

            drugNameList.addAll(drugDtoList.stream()
                    .map(DrugDto::getDrugName)
                    .distinct()
                    .toList());
        } catch (Exception e) {
            drugDtoList = new ArrayList<>();
            throw new RuntimeException(e);
        }
    }

    public List<DrugDto> show(int size){
        log.info(drugDtoList.size());
        return drugDtoList.subList(0,size);
    }

    public ResponseDrugDto findCondition(String condition, int page, int pageSize){
        List<DrugDto> dtoList = drugDtoList.stream()
                .filter(d -> d.getCondition().equals(condition))
                .toList();

        if(dtoList.isEmpty()){
            return null;
        }

        Map<String, Long> positiveMap = new HashMap<>();
        Map<String, Long> negativeMap = new HashMap<>();
        Map<String, DrugDto> dtoMap = new HashMap<>();

        for(DrugDto dto : dtoList){
            dtoMap.put(dto.getDrugName(), dto);
            if(!positiveMap.containsKey(dto.getDrugName())){
                positiveMap.put(dto.getDrugName(), 0L);
            }
            if(!negativeMap.containsKey(dto.getDrugName())){
                negativeMap.put(dto.getDrugName(), 0L);
            }
            if(dto.getSentiment().equals("POSITIVE")){
                positiveMap.put(dto.getDrugName(), positiveMap.get(dto.getDrugName()) + 1);
            }else if(dto.getSentiment().equals("NEGATIVE")){
                negativeMap.put(dto.getDrugName(), negativeMap.get(dto.getDrugName()) + 1);
            }
        }

        List<ResponseFindByCondition> list = new ArrayList<>();

        for(String key : positiveMap.keySet()){
            list.add(new ResponseFindByCondition(dtoMap.get(key), positiveMap.get(key), negativeMap.get(key)));
        }

        Page p = Page.builder()
                .list(list)
                .build();
        return p.getLists(page, pageSize);
    }

    public ResponseDrugOneData findDrugName(String drugName){
        List<DrugDto> dtoList = drugDtoList.stream()
                .filter(d -> d.getDrugName().equals(drugName))
                .toList();

        List<String> positiveReviews = new ArrayList<>();
        List<String> negativeReviews = new ArrayList<>();
        Set<String> setCondition = new HashSet<>();

        for(DrugDto dto : dtoList){
            if(dto.getSentiment().equals("POSITIVE")){
                positiveReviews.add(dto.getReview());
            }else if(dto.getSentiment().equals("NEGATIVE")){
                negativeReviews.add(dto.getReview());
            }
            setCondition.add(dto.getCondition());
        }

        if(dtoList.isEmpty()){
            return null;
        }
        return ResponseDrugOneData.toDrugDto(dtoList.getFirst(), setCondition.stream().toList(), positiveReviews, negativeReviews);
    }
}
