package com.project.harmonie_e_commerce.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailDTO {
    @NotBlank(message = "Email is required")
    private String toEmail;
    @NotBlank(message = "Subject is required")
    private String subject;
    @NotBlank(message = "Body is required")
    private String body;
}
