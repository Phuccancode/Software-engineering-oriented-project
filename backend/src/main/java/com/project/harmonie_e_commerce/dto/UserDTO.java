package com.project.harmonie_e_commerce.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    @NotBlank(message = "Full name is required")
    @JsonProperty("full_name")
    private String fullName;
    private Date dob;
    @Enumerated(EnumType.STRING)
    private Sex sex;

    private String phone;
    private String email;
    @NotBlank(message = "Password is required")
    private String password;
    public enum Sex {
        M, F, OTHER
    }
}
