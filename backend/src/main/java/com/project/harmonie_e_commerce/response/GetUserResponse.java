package com.project.harmonie_e_commerce.response;

import com.project.harmonie_e_commerce.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetUserResponse {
    private String full_name;
    private User.Role role;
}
