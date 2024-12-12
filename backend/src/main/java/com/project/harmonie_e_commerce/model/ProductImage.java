package com.project.harmonie_e_commerce.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name="product_images",
        uniqueConstraints = @UniqueConstraint(columnNames = {"product_id","url"})
)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "url", nullable = false)
    private String url;

    @ManyToOne
    @JoinColumn(name="product_id")
    private Product product;
}
