package com.project.harmonie_e_commerce.controller;

import com.project.harmonie_e_commerce.dto.request.UserCreationRequest;
import com.project.harmonie_e_commerce.dto.request.UserCredentialRequest;
import com.project.harmonie_e_commerce.dto.request.UserUpdateRequest;
import com.project.harmonie_e_commerce.model.User;
import com.project.harmonie_e_commerce.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Create a new user
    @PostMapping
    public User createUser(@RequestBody UserCreationRequest request) {
        return userService.createUser(request);
    }

    @GetMapping
    List<User> getUsers() {
        return userService.getUsers();
    }
    
    // Get user by ID
    @GetMapping("/{id}")
    User getUser(@PathVariable Integer id) {
        return userService.getUser(id);
    }

    // Get user by citizen ID
    @GetMapping("/citizenID={citizenId}")
    User getUserByCitizenId(@PathVariable String citizenId) {
        return userService.getUserByCitizenId(citizenId);
    }

    // Get user by email
    @GetMapping("/email={email}")
    User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    // Get user by phone
    @GetMapping("/phone={phone}")
    User getUserByPhone(@PathVariable String phone) {
        return userService.getUserByPhone(phone);
    }


    // Update user by ID
    @PutMapping("/{id}")
    User updateUser(@PathVariable Integer id, @RequestBody UserUpdateRequest request) {
        return userService.updateUser(id, request);
    }

    // Delete user by ID
    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User with ID " + id + " deleted successfully.");
    }


    // Delete user by citizen ID
    @DeleteMapping("/citizenID={citizenId}")
    ResponseEntity<String> deleteUserByCitizenId(@PathVariable String citizenId) {
        userService.deleteUserByCitizenId(citizenId);
        return ResponseEntity.ok("User with citizen_id " + citizenId + " deleted successfully.");
    }

    // Delete user by email
    @DeleteMapping("/email={email}")
    ResponseEntity<String> deleteUserByEmail(@PathVariable String email) {
        userService.deleteUserByEmail(email);
        return ResponseEntity.ok("User with email " + email + " deleted successfully.");
    }

    // Delete user by phone
    @DeleteMapping("/phone={phone}")
    ResponseEntity<String> deleteUserByPhone(@PathVariable String phone) {
        userService.deleteUserByPhone(phone);
        return ResponseEntity.ok("User with phone number " + phone + " deleted successfully.");
    }

    // Delete all users
    @DeleteMapping
    ResponseEntity<String> deleteAllUsers() {
        userService.deleteAllUsers();
        return ResponseEntity.ok("All users deleted successfully.");
    }

    //////////////////////////////////////////////////////////////////
    

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserCredentialRequest request) {
        if(userService.authenticateUser(request) != null) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }    
    }   
}