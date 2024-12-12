package com.project.harmonie_e_commerce.controller;

import com.project.harmonie_e_commerce.dto.DeliveryInformationDTO;
import com.project.harmonie_e_commerce.service.DeliveryInfoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/user/delivery")
@AllArgsConstructor
public class DeliInfoController {

    private final DeliveryInfoService deliveryInfoService;

    @PostMapping("/create/{user_id}")
    public ResponseEntity<?> createDeliInfo(
            @PathVariable Integer user_id,
            @RequestBody DeliveryInformationDTO dto
    ){
        try {
            return new ResponseEntity<>(deliveryInfoService.createDeliveryInfo(user_id,dto), HttpStatus.OK);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{deli_id}")
    public ResponseEntity<?> updateDeliInfo(
            @PathVariable Integer deli_id,
            @RequestBody DeliveryInformationDTO dto
    ){
        try {
            return new ResponseEntity<>(deliveryInfoService.updateDeliveryInfo(deli_id,dto), HttpStatus.OK);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all/{user_id}")
    public ResponseEntity<?> updateDeliInfo(
            @PathVariable Integer user_id
    ){
        try {
            return new ResponseEntity<>(deliveryInfoService.showAllDeliInfo(user_id), HttpStatus.OK);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{deli_id}")
    public ResponseEntity<?> deleteDeliInfo(
            @PathVariable Integer deli_id
    ){
        try {
            deliveryInfoService.deleteDeliInfo(deli_id);
            return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
