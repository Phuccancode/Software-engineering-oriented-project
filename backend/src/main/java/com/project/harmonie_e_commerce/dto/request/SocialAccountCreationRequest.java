package com.project.harmonie_e_commerce.dto.request;

import jakarta.validation.constraints.NotNull;

public class SocialAccountCreationRequest {
    
    private String email;
    @NotNull(message = "Provider ID is required")
    private String providerId;
    @NotNull(message = "User ID is required")
    private Integer userID;
    @NotNull(message = "Provider is required")
    private String provider;
    

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }
}
