package com.project.harmonie_e_commerce.controller;

import com.project.harmonie_e_commerce.dto.*;
import com.project.harmonie_e_commerce.model.User;
import com.project.harmonie_e_commerce.response.StringResponse;
import com.project.harmonie_e_commerce.service.IUserService;
import com.project.harmonie_e_commerce.util.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO,
                                        BindingResult result) {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            User user = userService.createUser(userDTO);
            return ResponseEntity.ok("User created successfully");
    }

    //No need to validate because u can input everything, if phone number and password are wrong
    // it will alert an error (500)
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDTO userLoginDTO) {
            String token = userService.login(userLoginDTO.getEmail(), userLoginDTO.getPassword());
            return ResponseEntity.ok(new StringResponse(token));
    }

    @PostMapping("/login-social")
    public ResponseEntity<?> loginSocial(HttpServletRequest request) {
        String idToken = request.getHeader("Authorization");
        if(idToken == null || !idToken.startsWith("Bearer ")){
            throw new AuthenticationException("Unauthorized") {};
        }
        Map<String,String> info = JwtUtils.decodeIdToken(idToken.substring(7));
        String token = userService.loginSocial(info.get("email"), info.get("name"), info.get("sub"));
        return ResponseEntity.ok(new StringResponse(token));
    }

    @GetMapping("/get-user")
    public ResponseEntity<?> getUser(
            HttpServletRequest request
    ){
        String token = request.getHeader("Authorization");
        if(token == null || !token.startsWith("Bearer ")){
            throw new AuthenticationException("Unauthorized") {};
        }
        token = token.substring(7);
        return ResponseEntity.ok(userService.getUser(token));
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(
            HttpServletRequest request
    ){
        String token = request.getHeader("Authorization");
        if(token == null || !token.startsWith("Bearer ")){
            throw new AuthenticationException("Unauthorized") {};
        }
        token = token.substring(7);
        return ResponseEntity.ok(userService.getProfile(token));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @RequestBody ProfileDTO profileDTO,
            HttpServletRequest request
    ){
        String token = request.getHeader("Authorization");
        if(token == null || !token.startsWith("Bearer ")){
            throw new AuthenticationException("Unauthorized") {};
        }
        token = token.substring(7);
        return ResponseEntity.ok(userService.updateProfile(profileDTO,token));
    }

    @PutMapping("/password")
    public ResponseEntity<?> updatePassword(
            @RequestBody ResetPasswordDTO resetPasswordDTO,
            HttpServletRequest request
    ){
        String token = request.getHeader("Authorization");
        if(token == null || !token.startsWith("Bearer ")){
            throw new AuthenticationException("Unauthorized") {};
        }
        token = token.substring(7);
        return ResponseEntity.ok(userService.updatePassword(resetPasswordDTO,token));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordDTO forgotPasswordDTO) {
        return ResponseEntity.ok(userService.forgotPassword(forgotPasswordDTO));
    }

    @PutMapping("/update-password")
    public ResponseEntity<?> updatePasswordByCode(@Valid @RequestBody UpdatePasswordDTO updatePasswordDTO) {
        return ResponseEntity.ok(userService.updatePasswordByCode(updatePasswordDTO));
    }

    @GetMapping("/expenses")
    public ResponseEntity<?> getExpenses(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            throw new AuthenticationException("Unauthorized") {};
        }
        token = token.substring(7);
        return ResponseEntity.ok(userService.getUserExpenses(token));
    }



}
