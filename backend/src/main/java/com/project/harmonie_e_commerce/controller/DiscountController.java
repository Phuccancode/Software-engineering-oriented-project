package com.project.harmonie_e_commerce.controller;

import com.project.harmonie_e_commerce.dto.ShippingDiscountDTO;
import com.project.harmonie_e_commerce.dto.StoreDiscountDTO;
import com.project.harmonie_e_commerce.dto.SystemDiscountDTO;
import com.project.harmonie_e_commerce.service.CartService;
import com.project.harmonie_e_commerce.service.DiscountService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/")
@AllArgsConstructor
public class DiscountController {

    private final CartService cartService;

    private final DiscountService discountService;

    @GetMapping("shipping_discount")
    public ResponseEntity<?> getAllShippingDiscount(){
        try {
            return new ResponseEntity<>(discountService.getAllShippingDiscount(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("store_discount/{storeId}")
    public ResponseEntity<?> getAllStoreDiscount(
        @PathVariable Integer storeId
    )
    {
        try {
            return new ResponseEntity<>(discountService.getAllStoreDiscount(storeId), HttpStatus.OK);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("system_discount")
    public ResponseEntity<?> getAllSystemDiscount(){
        try {
            return new ResponseEntity<>(discountService.getAllSystemDiscount(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("add/system_discount")
    public ResponseEntity<?> createSystemDiscount(
            @RequestBody SystemDiscountDTO systemDiscountDTO
            ){
        try {
            return new ResponseEntity<>(discountService.createSystemDiscount(systemDiscountDTO), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("add/shipping_discount")
    public ResponseEntity<?> createShippingDiscount(
            @RequestBody ShippingDiscountDTO shippingDiscountDTO
            ){
        try {
            return new ResponseEntity<>(discountService.createShippingDiscount(shippingDiscountDTO), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("add/store_discount/{store_id}")
    public ResponseEntity<?> createStoreDiscount(
            @RequestBody StoreDiscountDTO dto,
            @PathVariable Integer store_id
            ){
        try {
            return new ResponseEntity<>(discountService.createStoreDiscount(store_id,dto), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
