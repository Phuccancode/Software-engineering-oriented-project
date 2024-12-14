package com.project.harmonie_e_commerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "delivery_informations")
public class DeliveryInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "consignee_name", length = 50,nullable = false)
    private String consigneeName;

    @Column(name = "phone_number", length = 20, nullable = false)
    private String phoneNumber;

    @Column(name = "road_number", length = 20, nullable = false)
    private String roadNumber;

    @Column(name = "ward", length = 50, nullable = false)
    private String ward;

    @Column(name = "district", length = 50, nullable = false)
    private String district;

    @Column(name = "city",length = 50, nullable = false)
    private String city;

}
