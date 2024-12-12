package com.project.harmonie_e_commerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class StoreDTO {
    private String name;
    private String address;
    private String tax_id;
    private String description;
}
