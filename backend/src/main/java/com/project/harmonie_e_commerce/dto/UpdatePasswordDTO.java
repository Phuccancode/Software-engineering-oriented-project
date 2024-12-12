package com.project.harmonie_e_commerce.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePasswordDTO {
    @NotBlank(message = "Username is required")
    private String username;
    @NotBlank(message = "Code verify is required")
    private String codeVerify;
    @NotBlank(message = "New password is required")
    @JsonProperty("new_password")
    private String newPassword;
}
