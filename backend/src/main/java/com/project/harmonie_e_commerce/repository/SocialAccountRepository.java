package com.project.harmonie_e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.harmonie_e_commerce.model.SocialAccount;

import java.util.Optional;

@Repository
public interface SocialAccountRepository extends JpaRepository<SocialAccount, Integer> {
    Optional<SocialAccount> findByEmail(String email);
    
    Optional<SocialAccount> findByProviderIdAndEmail(String providerId, String email);

    Optional<SocialAccount> findByUserId(Integer userId);
}
