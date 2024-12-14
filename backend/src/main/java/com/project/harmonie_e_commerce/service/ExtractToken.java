package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.User;
import com.project.harmonie_e_commerce.repository.UserRepository;
import com.project.harmonie_e_commerce.util.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class ExtractToken {

    private final UserRepository userRepository;
    public Integer getIdFromToken (HttpServletRequest request){
        String idToken = request.getHeader("Authorization");
        if(idToken == null || !idToken.startsWith("Bearer ")){
            throw new AuthenticationException("Unauthorized") {};
        }
        Map<String,String> info = JwtUtils.decodeWebToken(idToken.substring(7));
        String email = info.get("email");
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new DataNotFoundException("User not found with email " + email)
        );
        return user.getId();
    }
}
