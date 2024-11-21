package com.project.harmonie_e_commerce.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

import com.project.harmonie_e_commerce.model.User.Sex;


public class UserCreationRequest {

    @NotNull(message = "Citizen ID is required")
    private String citizenId;
    @NotNull(message = "First name is required")
    private String fname;
    @NotNull(message = "Last name is required")
    private String lname;
    @NotNull(message = "Password is required")
    @Size(min=8, max=20, message = "Password must be between 8 and 20 characters")
    private String password;
    @NotNull(message = "Date of Birth is required")
    private LocalDate dob;
    @NotNull(message = "Gender is required")
    private Sex sex;
    @NotNull(message = "Phone number is required")
    private String phone;
    @NotNull(message = "Email is required")
    private String email;

    // Getters and Setters

    public String getCitizenId() {
        return citizenId;
    }

    public void setCitizenId(String citizenId) {
        this.citizenId = citizenId;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getPassword() {
        return password;
    }

    // public void setPassword(String password) {     
    //     BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    //     this.password = passwordEncoder.encode(password);
    // }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}