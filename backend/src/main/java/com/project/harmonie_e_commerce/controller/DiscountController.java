package com.project.harmonie_e_commerce.controller;

import com.project.harmonie_e_commerce.dto.ShippingDiscountDTO;
import com.project.harmonie_e_commerce.dto.StoreDiscountDTO;
import com.project.harmonie_e_commerce.dto.SystemDiscountDTO;
import com.project.harmonie_e_commerce.service.CartService;
import com.project.harmonie_e_commerce.service.DiscountService;
import com.project.harmonie_e_commerce.service.ExtractToken;
import jakarta.servlet.http.HttpServletRequest;
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

    private final ExtractToken extractToken;

    @GetMapping("shipping_discount")
    public ResponseEntity<?> getAllShippingDiscount(){
            return new ResponseEntity<>(discountService.getAllShippingDiscount(), HttpStatus.OK);
    }

    @GetMapping("store_discount/{storeId}")
    public ResponseEntity<?> getAllStoreDiscount(
        @PathVariable Integer storeId
    )
    {
            return new ResponseEntity<>(discountService.getAllStoreDiscount(storeId), HttpStatus.OK);
    }

    @GetMapping("system_discount")
    public ResponseEntity<?> getAllSystemDiscount(){
            return new ResponseEntity<>(discountService.getAllSystemDiscount(), HttpStatus.OK);
    }

    @PostMapping("add/system_discount")
    public ResponseEntity<?> createSystemDiscount(
            @RequestBody SystemDiscountDTO systemDiscountDTO
            ){
            return new ResponseEntity<>(discountService.createSystemDiscount(systemDiscountDTO), HttpStatus.OK);
    }

    @PostMapping("add/shipping_discount")
    public ResponseEntity<?> createShippingDiscount(
            @RequestBody ShippingDiscountDTO shippingDiscountDTO
            ){
            return new ResponseEntity<>(discountService.createShippingDiscount(shippingDiscountDTO), HttpStatus.OK);
    }

    @PostMapping("add/store_discount")
    public ResponseEntity<?> createStoreDiscount(
            @RequestBody StoreDiscountDTO dto,
            HttpServletRequest request
    ){
            Integer store_id = extractToken.getIdFromToken(request);
            return new ResponseEntity<>(discountService.createStoreDiscount(store_id,dto), HttpStatus.OK);
    }

    @GetMapping("store_discount")
    public ResponseEntity<?> getStoreDiscount(
            HttpServletRequest request
    ){
        Integer store_id = extractToken.getIdFromToken(request);
        return new ResponseEntity<>(discountService.getAllStoreDiscount(store_id), HttpStatus.OK);
    }

    @PutMapping("store_discount/{id}")
    public ResponseEntity<?> updateStoreDiscount(
            @RequestBody StoreDiscountDTO dto,
            @PathVariable Integer id
    ){
        return new ResponseEntity<>(discountService.updateStoreDiscount(id,dto), HttpStatus.OK);
    }

    @DeleteMapping("store_discount/{id}")
    public ResponseEntity<?> deleteStoreDiscount(
            @PathVariable Integer id
    ){
        return new ResponseEntity<>(discountService.deleteStoreDiscount(id), HttpStatus.OK);
    }

}
