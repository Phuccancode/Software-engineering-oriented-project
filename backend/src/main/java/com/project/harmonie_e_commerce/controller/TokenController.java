// ---- LATER ----


// package com.project.harmonie_e_commerce.controller;

// import com.project.harmonie_e_commerce.entity.User;
// import com.project.harmonie_e_commerce.service.UserService;
// import com.project.harmonie_e_commerce.service.TokenService;
// import com.project.harmonie_e_commerce.dto.request.UserCredentialRequest;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import java.util.Map;
// import java.util.HashMap;
// import java.util.Collections;


// @RestController
// @RequestMapping("/api/token")
// public class TokenController{

//     @Autowired
//     private final TokenService tokenService;

//     @Autowired
//     private UserService userService;


//     public TokenController(TokenService tokenService, UserService userService){
//         this.tokenService = tokenService;
//         this.userService = userService;
//     }

//     // Generate an access token and refresh token
//     @PostMapping("/generate")
//     public ResponseEntity<Map<String, String>> 
//             generateTokens(@RequestBody UserCredentialRequest userCredentalRequest) {
//         User user = userService.authenticateUser(userCredentalRequest);  // Authenticate the user based on credentials

//         if (user != null) {
//             String accessToken = tokenService.generateAccessToken(user);
//             String refreshToken = tokenService.generateRefreshToken(user);

//             Map<String, String> tokens = new HashMap<>();
//             tokens.put("access_token", accessToken);
//             tokens.put("refresh_token", refreshToken);
//             return ResponseEntity.ok(tokens);
//         }
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "Invalid credentials"));
//     }

//     // Refresh the access token using a valid refresh token
//     @PostMapping("/refresh")
//     public ResponseEntity<Map<String, String>> refreshToken(@RequestBody Map<String, String> refreshTokenRequest) {
//         String refreshToken = refreshTokenRequest.get("refresh_token");

//         String newAccessToken = tokenService.refreshAccessToken(refreshToken);
//         if (newAccessToken != null) {
//             return ResponseEntity.ok(Collections.singletonMap("access_token", newAccessToken));
//         }
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "Invalid or expired refresh token"));
//     }

//     // Revoke a token
//     @PostMapping("/revoke")
//     public ResponseEntity<String> revokeToken(@RequestBody Map<String, String> tokenRequest) {
//         String token = tokenRequest.get("token");

//         tokenService.revokeToken(token);
//         return ResponseEntity.ok("Token revoked successfully");
//     }

// }
