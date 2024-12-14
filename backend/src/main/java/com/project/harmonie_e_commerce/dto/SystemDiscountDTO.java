package com.project.harmonie_e_commerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class SystemDiscountDTO {
    private String code;
    private Integer quantity;
    private Date start_date;
    private Date expiration_date;
    private Float max_amount;
    private Integer percentage;
    private Float min_bill_amt;
}
