package com.project.harmonie_e_commerce.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "full_name", length = 50, nullable = false)
    private String fullName;

    @NotNull(message = "Password is required")
    @Column(name = "password", length = 255, nullable = false)
    private String password;


    @Column(name = "dob")
    private Date dob;


    @Column(name = "sex")
    private String sex;

    @Column(name = "phone", length = 10, unique = true)
    private String phone;

    @Column(name = "email", length = 255, unique = true, nullable = false)
    private String email;

    @Column(name = "creation_date", nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp creation_date;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    public enum Role {
        ADMIN,
        USER
    }

    private String codeVerify;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority("ROLE_"+role.name()));
        return authorityList;
    }


    @Override
    public String getUsername() {
        return email;
    }
}
