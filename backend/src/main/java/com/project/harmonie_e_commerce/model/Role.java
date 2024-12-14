//package com.project.harmonie_e_commerce.model;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//@Entity
//@Table(
//        name = "roles"
//)
//public class Role {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//    @OneToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//    @Column(name = "role")
//    private String role;
//}
