package com.project.harmonie_e_commerce.controller;

import com.project.harmonie_e_commerce.dto.DeliveryInformationDTO;
import com.project.harmonie_e_commerce.service.DeliveryInfoService;
import com.project.harmonie_e_commerce.service.ExtractToken;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/user/delivery")
@AllArgsConstructor
public class DeliInfoController {

    private final DeliveryInfoService deliveryInfoService;
    private final ExtractToken extractToken;

    @PostMapping("/create")
    public ResponseEntity<?> createDeliInfo(
            @RequestBody DeliveryInformationDTO dto,
            HttpServletRequest request
    ){
            Integer user_id = extractToken.getIdFromToken(request);
            return new ResponseEntity<>(deliveryInfoService.createDeliveryInfo(user_id,dto), HttpStatus.OK);
    }

    @PutMapping("/update/{deli_id}")
    public ResponseEntity<?> updateDeliInfo(
            @PathVariable Integer deli_id,
            @RequestBody DeliveryInformationDTO dto
    ){
            return new ResponseEntity<>(deliveryInfoService.updateDeliveryInfo(deli_id,dto), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> updateDeliInfo(
            HttpServletRequest request
    ){
            Integer user_id = extractToken.getIdFromToken(request);
            return new ResponseEntity<>(deliveryInfoService.showAllDeliInfo(user_id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{deli_id}")
    public ResponseEntity<?> deleteDeliInfo(
            @PathVariable Integer deli_id
    ){
            deliveryInfoService.deleteDeliInfo(deli_id);
            return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
    }
}
