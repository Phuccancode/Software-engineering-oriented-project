package com.project.harmonie_e_commerce.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Check;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        name = "reviews"
)
@Check(constraints = "rating BETWEEN 1 AND 5")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "rating", nullable = false)
    private Integer rating;
    @Column(name = "text", nullable = false, columnDefinition = "TEXT")
    private String text;
    @Column(name = "time",nullable = false)
    @CreationTimestamp
    private Timestamp time;

}
