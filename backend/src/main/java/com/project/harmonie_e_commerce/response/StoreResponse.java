package com.project.harmonie_e_commerce.response;

import com.project.harmonie_e_commerce.model.Store;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StoreResponse {
    
    private String name;
    private String address;
    private String description;


    static public StoreResponse fromStore(Store store) {
        return StoreResponse.builder()
            .name(store.getName())
            .address(store.getAddress())
            .description(store.getDescription())
            .build();
    }
}