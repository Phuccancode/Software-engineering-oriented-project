package com.project.harmonie_e_commerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.sql.Date;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class StoreDiscountDTO {
    private String code;
    private Integer quantity;
    private Date start_date;
    private Date expiration_date;
    private Float amount;
}
