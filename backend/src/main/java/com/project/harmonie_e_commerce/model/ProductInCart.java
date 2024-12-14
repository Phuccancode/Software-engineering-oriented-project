package com.project.harmonie_e_commerce.model;

// import com.project.harmonie_e_commerce.model.CompositeKey.ProductInCartKey;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        name = "products_in_carts",
        uniqueConstraints = @UniqueConstraint(columnNames = {"product_id","user_id"})
)
public class ProductInCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "quantity",nullable = false)
    private Integer quantity;

    @JsonIgnore
    @ManyToOne //TODO: check kiểu CASCADE
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne //TODO: check kiểu CASCADE
    @JoinColumn(name = "product_id")
    private Product product;
}
