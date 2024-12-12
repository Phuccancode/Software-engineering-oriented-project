package com.project.harmonie_e_commerce.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ForgotPasswordDTO {
    @NotBlank(message = "username is required")
    private String username;
}
