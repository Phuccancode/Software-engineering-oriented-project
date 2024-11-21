package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.request.SocialAccountCreationRequest;
import com.project.harmonie_e_commerce.model.SocialAccount;
import com.project.harmonie_e_commerce.model.User;
import com.project.harmonie_e_commerce.repository.SocialAccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;


@Service
public class SocialAccountService {

   @Autowired 
   private final SocialAccountRepository socialAccountRepository;

    public SocialAccountService(SocialAccountRepository socialAccountRepository) {
        this.socialAccountRepository = socialAccountRepository;
    }

    // Create a new SocialAccount and save it to the database
    public SocialAccount createSocialAccount(SocialAccountCreationRequest request) {
        SocialAccount socialAccount = new SocialAccount();
        socialAccount.setProviderId(request.getProviderId());
        socialAccount.setEmail(request.getEmail());
        socialAccount.setId(request.getUserID());

        return socialAccountRepository.save(socialAccount);
    }

    public SocialAccount getByEmail(String email) {
        return socialAccountRepository.findByEmail(email)
                                      .orElseThrow(() -> new RuntimeException("Social account not found"));
    }

    public SocialAccount getByUser(User user) {
        return socialAccountRepository.findByUserId(user.getId())
                                      .orElseThrow(() -> new RuntimeException("Social account not found"));
    }

    @Transactional
    public void deleteById(Integer id) {
        socialAccountRepository.deleteById(id);
    }
}
