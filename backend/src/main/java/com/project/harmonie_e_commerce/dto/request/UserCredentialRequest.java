package com.project.harmonie_e_commerce.dto.request;


public class UserCredentialRequest {

    // Common fields for login options
    private String loginType; // e.g., "email", "phone", "social"

    private String email;
    private String phone;
    private String password; // Only used for email/phone login

    // Fields for social login (optional)
    private String socialProvider; // e.g., "facebook", "google"
    private String socialToken;    // Token or identifier for social login (optional)
    private Integer userId;

    // Constructor, getters, setters, and toString (if needed)
    public UserCredentialRequest() {}

    public UserCredentialRequest(String loginType, String password) {
        this.loginType = loginType;
        this.password = password;
    }

    public UserCredentialRequest
            (String loginType, String password, 
            String socialProvider, String socialToken) {
        this.loginType = loginType;
        this.password = password;
        this.socialToken = socialToken;
    }

    // Getters and Setters
    public String getLoginType() {
        return loginType;
    }

    public void setLoginType(String loginType) {
        this.loginType = loginType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSocialProvider() {
        return socialProvider;
    }

    public void setSocialProvider(String socialProvider) {
        this.socialProvider = socialProvider;
    }

    public String getSocialToken() {
        return socialToken;
    }

    public void setSocialToken(String socialToken) {
        this.socialToken = socialToken;
    }

    // @Override
    // public String toString() {
    //     return "UserCredentialsDTO [loginType=" + loginType + ", password="
    //             + password + ", socialProvider=" + socialProvider + ", socialToken=" + socialToken + "]";
    // }

}
