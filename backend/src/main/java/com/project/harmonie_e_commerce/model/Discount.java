package com.project.harmonie_e_commerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;
import java.sql.Timestamp;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "discounts")
@Inheritance(strategy = InheritanceType.JOINED)
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "code", length = 50, nullable = false)
    private String code;
    @Column(name = "quantity",nullable = false)
    private Integer quantity;
    @Column(name = "release_date",nullable = false)
    @CreationTimestamp
    private Timestamp releaseDate;
    @Column(name = "start_date",nullable = false)
    private Date startDate;
    @Column(name = "expiration_date",nullable = false)
    private Date expirationDate;
}
