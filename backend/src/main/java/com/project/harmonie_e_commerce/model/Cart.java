//package com.project.harmonie_e_commerce.model;
//
//import jakarta.persistence.*;
//import lombok.*;
//import java.util.List;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
//@Entity
//@Table(name = "carts")
//public class Cart {
//   @Id
//   @GeneratedValue( strategy = GenerationType.IDENTITY)
//   private Long id;
//   @Column(name = "total_items")
//   private Integer total_items;
//
//   @OneToMany(mappedBy = "cart")
//   private List<ProductInCart> productInCart;
//}
