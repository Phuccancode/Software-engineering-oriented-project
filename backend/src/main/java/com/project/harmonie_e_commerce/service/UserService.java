package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.request.*;
import com.project.harmonie_e_commerce.model.SocialAccount;
import com.project.harmonie_e_commerce.model.User;
import com.project.harmonie_e_commerce.repository.SocialAccountRepository;
import com.project.harmonie_e_commerce.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final SocialAccountRepository socialAccountRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, SocialAccountRepository socialAccountRepository) {
        this.userRepository = userRepository;
        this.socialAccountRepository = socialAccountRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();  // Consider using a @Bean for BCryptPasswordEncoder instead of creating a new instance here.
    }

    
    // Create a new user
    public User createUser(UserCreationRequest request) {
        User user = new User();
        user.setCitizenId(request.getCitizenId());
        user.setFname(request.getFname());
        user.setLname(request.getLname());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setDob(request.getDob());
        user.setSex(request.getSex());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());

        return userRepository.save(user);
    }

    // Get all users
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public User getUser(Integer id) {
        return userRepository.findById(id)
                             .orElseThrow(() -> new RuntimeException("User not found"));
    }


    // Get user by citizen ID
    public User getUserByCitizenId(String citizenId) {
        return userRepository.findByCitizenId(citizenId)
                             .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Get user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Get user by phone
    public User getUserByPhone(String phone) {
        return userRepository.findByPhone(phone)
                             .orElseThrow(() -> new RuntimeException("User not found"));
    }


    public User updateUser(Integer id, UserUpdateRequest request) {
        User user = getUser(id);

        user.setFname(request.getFname());
        user.setLname(request.getLname());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setDob(request.getDob());
        user.setSex(request.getSex());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());

        return userRepository.save(user);
    }


    // Transactional annotation is used to rollback the transaction if any exception occurs // 
    
    @Transactional
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public void deleteUserByCitizenId(String citizenId) {
        userRepository.deleteByCitizenId(citizenId);
    }

    @Transactional
    public void deleteUserByEmail(String email) {
        userRepository.deleteByEmail(email);
    }

    @Transactional
    public void deleteUserByPhone(String phone) {
        userRepository.deleteByPhone(phone);
    }

    @Transactional
    public void deleteAllUsers() {
        userRepository.deleteAll();
    }

    //////////////////////////////////////////////////
    public User authenticateWithEmail(UserCredentialRequest request) {
        User user = getUserByEmail(request.getEmail());
    
        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return user;
        }
        throw new RuntimeException("Invalid password");
    }

    public User authenticateWithPhone(UserCredentialRequest request) {
        User user = getUserByPhone(request.getPhone());
    
        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return user;
        }
        throw new RuntimeException("Invalid password");
    }

    public User authenticateWithSocial(UserCredentialRequest request) {
        SocialAccount socialAccount = socialAccountRepository.findByUserId(request.getUserId())
                        .orElseThrow(() -> new RuntimeException("User not found"));
        return socialAccount.getUser();
    }



    // Authenticate user by email and password
    public User authenticateUser(UserCredentialRequest request) {
        if(request.getLoginType().equals("email")) {
            return authenticateWithEmail(request);
        }
        if(request.getLoginType().equals("phone")) {
            return authenticateWithPhone(request);
        }
        if(request.getLoginType().equals("social")) {
            return authenticateWithSocial(request);
        }
        throw new RuntimeException("Invalid login type");
    }


}
