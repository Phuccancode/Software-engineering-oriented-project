package com.project.harmonie_e_commerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "shipping_discounts")
public class ShippingDiscount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "max_amount", columnDefinition = "DECIMAL(15,2)", nullable = false)
    private Float maxAmount;

    @OneToOne
    @JoinColumn(name = "discount_id")
    private Discount discount;
}
