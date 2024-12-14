package com.project.harmonie_e_commerce.controller;

import com.project.harmonie_e_commerce.model.ProductInBox;
import com.project.harmonie_e_commerce.service.ProductInBoxService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/${api.prefix}/box")
@AllArgsConstructor
public class BoxController {

    private final ProductInBoxService productInBoxService;

    @GetMapping("/show/{box_id}")
    public ResponseEntity<?> getAllProductInBox(
            @PathVariable Integer box_id
    ){
        return ResponseEntity.ok(productInBoxService.getProductsInBox(box_id));
    }
}
