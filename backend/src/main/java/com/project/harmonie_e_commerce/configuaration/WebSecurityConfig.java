package com.project.harmonie_e_commerce.configuaration;

import com.project.harmonie_e_commerce.component.CustomAccessDeniedHandler;
import com.project.harmonie_e_commerce.component.CustomAuthenticationEntryPoint;
import com.project.harmonie_e_commerce.filter.JwtTokenFilter;
import com.project.harmonie_e_commerce.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.project.harmonie_e_commerce.model.User.Role.ADMIN;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {
    private final JwtTokenFilter jwtTokenFilter;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Tắt tính năng CSRF (Cross-Site Request Forgery) trong Spring Security.
        http
                .csrf(AbstractHttpConfigurer::disable)
                // add a filter before the UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                // config rules for authorize requests
                .authorizeHttpRequests(requests -> {
                    requests.requestMatchers("/api/v1/admin/**").hasAuthority("ROLE_ADMIN")
                            .requestMatchers(HttpMethod.PUT, "/api/v1/categories").hasAuthority("ROLE_ADMIN")
                            .requestMatchers(HttpMethod.POST, "/api/v1/categories").hasAuthority("ROLE_ADMIN")
                            .requestMatchers(HttpMethod.DELETE, "/api/v1/categories").hasAuthority("ROLE_ADMIN")

                            .requestMatchers(HttpMethod.GET, "/api/v1/categories").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/categories/**").permitAll()
                            .requestMatchers("/api/v1/users/**").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/products").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/categories").permitAll()
                            // image
                            .requestMatchers(HttpMethod.GET, "/images/**").permitAll()
                            .requestMatchers(HttpMethod.GET, "/images/").permitAll()
                            .requestMatchers(HttpMethod.GET, "/images").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/products/**").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/payment/**").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/review/**").permitAll()

                            .requestMatchers("/api/v1/**").hasAuthority("ROLE_USER")
                            .requestMatchers("/api/v1/**").hasAuthority("ROLE_ADMIN")
                            // .requestMatchers("**").permitAll();
                            .anyRequest().authenticated();
                    // allow all requests without authentication

                });
        // .exceptionHandling(
        // exceptions -> exceptions
        // .authenticationEntryPoint(customAuthenticationEntryPoint) // 401
        // .accessDeniedHandler(customAccessDeniedHandler)
        // );
        // build the http security configuration and return it
        return http.build();
    }
}