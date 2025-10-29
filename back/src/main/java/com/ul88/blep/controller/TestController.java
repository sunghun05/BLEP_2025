package com.ul88.blep.controller;

import com.ul88.blep.dto.DrugDto;
import com.ul88.blep.dto.ResponseDrugDto;
import com.ul88.blep.dto.ResponseDrugOneData;
import com.ul88.blep.service.TestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Log4j2
public class TestController {
    private final TestService testService;

    @GetMapping("/find")
    public ResponseEntity<?> find(@RequestParam(required = false) String condition,
                                  @RequestParam(required = false) String drugName,
                                  @RequestParam(required = false, defaultValue = "1") int page,
                                  @RequestParam(required = false, defaultValue = "10") int pageSize){

        log.info("condition : "+condition + " drugName : " + drugName);
        if(condition != null && drugName != null) return ResponseEntity.notFound().build();

        if(condition != null){
            ResponseDrugDto re = testService.findCondition(condition, page, pageSize);
            if(re == null) return ResponseEntity.badRequest().build();
            return ResponseEntity.status(HttpStatus.OK).body(re);
        }

        if(drugName != null){
            ResponseDrugOneData re = testService.findDrugName(drugName);
            if(re == null) return ResponseEntity.badRequest().build();
            return ResponseEntity.status(HttpStatus.OK).body(re);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("condition")
    public ResponseEntity<?> findCondition(){
        return ResponseEntity.status(HttpStatus.OK).body(testService.getConditionList());
    }

    @GetMapping("drugname")
    public ResponseEntity<?> findDrugName(){
        return ResponseEntity.status(HttpStatus.OK).body(testService.getDrugNameList());
    }
}
