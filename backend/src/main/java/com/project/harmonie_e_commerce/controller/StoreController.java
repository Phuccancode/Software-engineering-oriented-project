package com.project.harmonie_e_commerce.controller;

import com.project.harmonie_e_commerce.dto.StoreDTO;
import com.project.harmonie_e_commerce.service.StoreService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/${api.prefix}/store")
@AllArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @PostMapping("/{user_id}/create")
    public ResponseEntity<?> createStore(
            @PathVariable Integer user_id,
            @RequestBody StoreDTO dto
            ){
        try {
            return new ResponseEntity<>(storeService.addNewStore(dto,user_id), HttpStatus.OK);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{store_id}/all/product")
    public ResponseEntity<?> showAllProduct(
            @PathVariable Integer store_id
    ){
        try {
            return new ResponseEntity<>(storeService.showAllProductInStore(store_id), HttpStatus.OK);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{store_id}/all/box")
    public ResponseEntity<?> showAllBox(
            @PathVariable Integer store_id
    ){
        try {
            return new ResponseEntity<>(storeService.showAllBoxInStore(store_id), HttpStatus.OK);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
