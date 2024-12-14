package com.project.harmonie_e_commerce.dto;

import com.project.harmonie_e_commerce.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDTO {
    private String full_name;
    private Date dob;
    private String sex;
    private String phone;
}
