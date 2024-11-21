package com.project.harmonie_e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.harmonie_e_commerce.model.Token;
import com.project.harmonie_e_commerce.model.User;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {
    Optional<Token> findByToken(String token);
    
    Optional<Token> findByUser(User user);

    Optional<Token> findByTokenAndType(String token, Token.TokenType type);


    void deleteByToken(String token);
    void deleteByUser(User user);
}
