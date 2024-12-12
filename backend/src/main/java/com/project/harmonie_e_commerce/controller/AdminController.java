package com.project.harmonie_e_commerce.controller;

import com.project.harmonie_e_commerce.dto.StoreDTO;
import com.project.harmonie_e_commerce.repository.UserRepository;
import com.project.harmonie_e_commerce.service.StoreService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/${api.prefix}/admin")
public class AdminController {
    private final StoreService storeService;

    private final UserRepository userRepository;

    @GetMapping("/store")
    public ResponseEntity<?> getAllStore(){
        return ResponseEntity.ok(storeService.getAllStore());
    }

    @PutMapping("/store/{store_id}")
    public ResponseEntity<?> updateStore(
            @PathVariable Integer store_id,
            @RequestBody StoreDTO storeDTO
    ){
        return ResponseEntity.ok(storeService.updateStore(storeDTO,store_id));
    }

    @DeleteMapping("/store/{store_id}")
    public ResponseEntity<?> deleteStore(
            @PathVariable Integer store_id
    ){
        return ResponseEntity.ok(storeService.deleteStore(store_id));
    }

    @GetMapping("/user")
    public ResponseEntity<?> getAllUser(){
        return ResponseEntity.ok(userRepository.findAll());
    }
}
