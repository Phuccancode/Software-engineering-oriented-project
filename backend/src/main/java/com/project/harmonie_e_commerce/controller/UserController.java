// package com.project.harmonie_e_commerce.controller;
//
// import com.project.harmonie_e_commerce.dto.request.UserCreationRequest;
// // import com.project.harmonie_e_commerce.dto.request.UserCredentialRequest;
// import com.project.harmonie_e_commerce.dto.request.UserUpdateRequest;
// import com.project.harmonie_e_commerce.model.User;
// import com.project.harmonie_e_commerce.service.UserService;
//
// import lombok.AllArgsConstructor;
//
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
//
// import jakarta.validation.Valid;
// import org.springframework.validation.BindingResult;
// import org.springframework.validation.FieldError;
//
// import java.util.List;
//
//
//
//
// @RestController
// @RequestMapping("/users")
// @AllArgsConstructor
// public class UserController {
//
//     private UserService userService;
//
//
//     // Create a new user
//     @PostMapping("")
//     public ResponseEntity<?> createUser(@Valid @RequestBody UserCreationRequest request, BindingResult result) {
//         try {
//             if(result.hasErrors()) {
//                 List<String> errorMessages = result.getFieldErrors()
//                         .stream()
//                         .map(FieldError::getDefaultMessage)
//                         .toList();
//                 return ResponseEntity.badRequest().body(errorMessages);
//             }
//             User newUser = userService.createUser(request);
//             return ResponseEntity.ok(newUser);
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(e.getMessage());
//         }
//     }
//
//
//     @GetMapping("/all")
//     public ResponseEntity<List<User>> getUsers() {
//         try{
//             return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }
//
//
//     @GetMapping("/{id}")
//     public ResponseEntity<User> getUserById(@PathVariable Long user_id) {
//         try{
//             return new ResponseEntity<>(userService.getUser(user_id), HttpStatus.OK);
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }
//
//     // Get user by citizen ID
//     @GetMapping("/citizenID={citizenId}")
//     public ResponseEntity<User> getUserByCitizenId(@PathVariable String citizenId) {
//         try{
//             return new ResponseEntity<>(userService.getUserByCitizenId(citizenId), HttpStatus.OK);
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }
//
//     // Get user by email
//     @GetMapping("/email={email}")
//     public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
//         try{
//             return new ResponseEntity<>(userService.getUserByEmail(email), HttpStatus.OK);
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }
//
//     // Get user by phone
//     @GetMapping("/phone={phone}")
//     public ResponseEntity<User> getUserByPhone(@PathVariable String phone) {
//         try{
//             return new ResponseEntity<>(userService.getUserByPhone(phone), HttpStatus.OK);
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }
//
//
//     // Update user by ID
//     // @PutMapping("/{id}")
//     // User updateUser(@PathVariable Long id, @RequestBody UserUpdateRequest request) {
//     //     return userService.updateUser(id, request);
//     // }
//
//
//     // Update user by ID
//     @PutMapping("/{id}")
//     public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UserUpdateRequest request, BindingResult result) {
//         try {
//             if(result.hasErrors()) {
//                 List<String> errorMessages = result.getFieldErrors()
//                         .stream()
//                         .map(FieldError::getDefaultMessage)
//                         .toList();
//                 return ResponseEntity.badRequest().body(errorMessages);
//             }
//             User updatedUser = userService.updateUser(id, request);
//             return ResponseEntity.ok(updatedUser);
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(e.getMessage());
//         }
//     }
//
//
//
//     // Delete user by ID
//     @DeleteMapping("/{id}")
//     public ResponseEntity<String> deleteUser(@PathVariable Long id) {
//         try{
//             userService.deleteUser(id);
//             return ResponseEntity.ok("User with ID " + id + " deleted successfully.");
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }
//
//
//     // Delete user by citizen ID
//     @DeleteMapping("/citizenID={citizenId}")
//     public ResponseEntity<String> deleteUserByCitizenId(@PathVariable String citizenId) {
//         try{
//             userService.deleteUserByCitizenId(citizenId);
//             return ResponseEntity.ok("User with citizen ID " + citizenId + " deleted successfully.");
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }
//
//     // Delete user by email
//     @DeleteMapping("/email={email}")
//     public ResponseEntity<String> deleteUserByEmail(@PathVariable String email) {
//         try{
//             userService.deleteUserByEmail(email);
//             return ResponseEntity.ok("User with email " + email + " deleted successfully.");
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }
//
//     // Delete user by phone
//     @DeleteMapping("/phone={phone}")
//     public ResponseEntity<String> deleteUserByPhone(@PathVariable String phone) {
//         try{
//             userService.deleteUserByPhone(phone);
//             return ResponseEntity.ok("User with phone number " + phone + " deleted successfully.");
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }
//
//     // Delete all users
//     @DeleteMapping("/all")
//     public ResponseEntity<String> deleteAllUsers() {
//         try{
//             userService.deleteAllUsers();
//             return ResponseEntity.ok("All users deleted successfully.");
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }
//
//     //////////////////////////////////////////////////////////////////
//
//
//     // @PostMapping("/login")
//     // public ResponseEntity<?> authenticateUser(@Valid @RequestBody UserCredentialRequest request, BindingResult result) {
//     //     try {
//     //         if(result.hasErrors()) {
//     //             List<String> errorMessages = result.getFieldErrors()
//     //                     .stream()
//     //                     .map(FieldError::getDefaultMessage)
//     //                     .toList();
//     //             return ResponseEntity.badRequest().body(errorMessages);
//     //         }
//     //         User authenticatedUser = userService.authenticateUser(request);
//     //         return ResponseEntity.ok(authenticatedUser);
//     //     } catch (Exception e) {
//     //         return ResponseEntity.badRequest().body(e.getMessage());
//     //     }
//     // }
// }