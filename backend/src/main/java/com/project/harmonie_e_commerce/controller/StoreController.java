package com.project.harmonie_e_commerce.controller;

import com.project.harmonie_e_commerce.dto.StoreDTO;
import com.project.harmonie_e_commerce.service.ExtractToken;
import com.project.harmonie_e_commerce.service.StoreService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/${api.prefix}/store")
@AllArgsConstructor
public class StoreController {

    private final StoreService storeService;
    private final ExtractToken extractToken;

    @PostMapping("/create")
    public ResponseEntity<?> createStore(
            @RequestBody StoreDTO dto,
            HttpServletRequest request
    ){
            Integer user_id = extractToken.getIdFromToken(request);
            return new ResponseEntity<>(storeService.addNewStore(dto,user_id), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateStore(
            @RequestBody StoreDTO dto,
            HttpServletRequest request
    ){
        Integer store_id = extractToken.getIdFromToken(request);
        return new ResponseEntity<>(storeService.updateStore(dto,store_id), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteStore(
            HttpServletRequest request,
            @RequestParam String password
    ){
        Integer store_id = extractToken.getIdFromToken(request);
        return new ResponseEntity<>(storeService.deleteStore(store_id,password), HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<?> getInfo(
            HttpServletRequest request
    ){
        Integer store_id = extractToken.getIdFromToken(request);
        return new ResponseEntity<>(storeService.getInfo(store_id), HttpStatus.OK);
    }

    @GetMapping("/all/product")
    public ResponseEntity<?> showAllProduct(
            HttpServletRequest request
    ){
            Integer store_id = extractToken.getIdFromToken(request);
            return new ResponseEntity<>(storeService.showAllProductInStore(store_id), HttpStatus.OK);
    }

    @GetMapping("/all/box")
    public ResponseEntity<?> showAllBox(
            HttpServletRequest request
    ){
            Integer store_id = extractToken.getIdFromToken(request);
            return new ResponseEntity<>(storeService.showAllBoxInStore(store_id), HttpStatus.OK);
    }

    @GetMapping("/statistic")
    public ResponseEntity<?> getStatistic(
            @RequestParam Integer day,
            @RequestParam Integer month,
            @RequestParam Integer year,
            HttpServletRequest request
    ){
            Integer store_id = extractToken.getIdFromToken(request);
            return new ResponseEntity<>(storeService.getStatisticOfStore(store_id,day, month, year), HttpStatus.OK);
    }


}
