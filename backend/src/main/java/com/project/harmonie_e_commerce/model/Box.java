package com.project.harmonie_e_commerce.model;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
// import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        name = "boxes"
)
public class Box {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "storeDiscount_id")
    private StoreDiscount storeDiscount;

    @ManyToOne
    @JoinColumn(name = "shippingDiscount_id")
    private ShippingDiscount shippingDiscount;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(name = "shipper_name", length = 50,nullable = false)
    private String shipperName;

    @Column(name = "shipper_phone", length = 10,nullable = false)
    private String shipperPhone;

    @Column(name = "total_price", columnDefinition = "DECIMAL(10,2)", nullable = false)
    private Float totalPrice;
    
    @Column(name = "fee_ship", columnDefinition = "DECIMAL(10,2)", nullable = false)
    private Float feeShip;

    @Column(name = "predicted_delivery_date")
    private LocalDate predictedDeliveryDate;

    @Column(name = "caution", columnDefinition = "TEXT")
    private String caution;

    @Column(name = "packing_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp packingDate;

    @Column(name = "status", columnDefinition = "ENUM('Pending', 'Shipped', 'Delivered') DEFAULT 'Pending'")
    @Enumerated(EnumType.STRING)
    private BoxStatus status;


    @OneToMany(mappedBy = "box", cascade = CascadeType.ALL)
    private List<ProductInBox> products;

    public enum BoxStatus{
        Pending, Shipped, Delivered
    }
}
