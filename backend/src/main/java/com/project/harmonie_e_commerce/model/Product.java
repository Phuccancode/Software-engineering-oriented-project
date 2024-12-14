package com.project.harmonie_e_commerce.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "brand", length = 20)
    private String brand;

    @Column(name = "price", nullable = false, columnDefinition = "DECIMAL(10,2)")
    private Float price;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "buying_count", columnDefinition = "INT DEFAULT 0")
    private Integer buyingCount;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "rating_count", columnDefinition = "INT DEFAULT 0")
    private Integer ratingCount;

    @Column(name = "avg_rating", columnDefinition = "DECIMAL(5,2) DEFAULT 0.0")
    private Float avgRating;

    @Column(name = "num_image")
    private Integer numImage;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ProductStatus productStatus;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public enum ProductStatus{
        enable,
        disable
    }
}
