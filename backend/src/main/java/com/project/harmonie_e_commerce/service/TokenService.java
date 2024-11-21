package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.model.Token;
import com.project.harmonie_e_commerce.model.User;
import com.project.harmonie_e_commerce.model.Token.TokenType;
import com.project.harmonie_e_commerce.repository.TokenRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.sql.Timestamp;


@Service
public class TokenService {
    
    @Autowired
    private final TokenRepository tokenRepository;

    private static final long ACCESS_TOKEN_EXPIRATION = 30 * 60 * 1000; // 30 minutes
    private static final long REFRESH_TOKEN_EXPIRATION = 60 * 60 * 1000; // 1 hour

    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    // Generate an access token
    public String generateAccessToken(User user) {
        String token = UUID.randomUUID().toString();  // You can use JWT or other libraries here
        Token tokenEntity = new Token();
        tokenEntity.setUser(user);
        tokenEntity.setToken(token);
        tokenEntity.setType(TokenType.ACCESS);
        tokenEntity.setRevoked(false);
        tokenEntity.setExpired(false);
        tokenEntity.setExpirationDate(new Timestamp(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION));

        tokenRepository.save(tokenEntity);
        return token;
    }

    // Generate a refresh token
    public String generateRefreshToken(User user) {
        String token = UUID.randomUUID().toString();  // Again, using UUID for simplicity, or use JWT
        Token tokenEntity = new Token();
        tokenEntity.setUser(user);
        tokenEntity.setToken(token);
        tokenEntity.setType(TokenType.REFRESH);
        tokenEntity.setRevoked(false);
        tokenEntity.setExpired(false);
        tokenEntity.setExpirationDate(new Timestamp(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION));

        tokenRepository.save(tokenEntity);
        return token;
    }


    public Token getByToken(String token) {
        return tokenRepository.findByToken(token)
                            .orElseThrow(() -> new RuntimeException("Token not found"));
    }

    public Token getByUser(User user) {
        return tokenRepository.findByUser(user)
                            .orElseThrow(() -> new RuntimeException("Token not found"));
    }


    // Validate if the token is still valid and not expired
    public boolean validateToken(String token) {
        Optional<Token> tokenEntity = tokenRepository.findByToken(token);
        return tokenEntity.isPresent() && tokenEntity.get().getExpirationDate().after(new Date());
    }

    // Remove a token (make it invalid)
    public void revokeToken(String token) {
        Optional<Token> tokenEntity = tokenRepository.findByToken(token);
        if (tokenEntity.isPresent()) {
            Token tokenObj = tokenEntity.get();
            tokenObj.setRevoked(true);
            tokenRepository.save(tokenObj);
        }
    }

    // Refresh the access token using the refresh token
    public String refreshAccessToken(String refreshToken) {
        Optional<Token> tokenEntity = tokenRepository.findByToken(refreshToken);
        if (tokenEntity.isPresent()){
            Token token = tokenEntity.get();
            if (token.getType().equals(TokenType.REFRESH) && 
                !token.isExpired() && !token.isRevoked()) {
                User user = token.getUser();
                return generateAccessToken(user);
            }
            }
        return null;
    }


    // @Transactional
    // public void deleteByID(Integer id) {
    //     tokenRepository.deleteById(id);
    // }

    // @Transactional
    // public void deleteByToken(String token) {
    //     tokenRepository.deleteByToken(token);
    // }

    // @Transactional
    // public void deleteByUserID(Integer userID) {
    //     tokenRepository.deleteByUserID(userID);
    // }
}
