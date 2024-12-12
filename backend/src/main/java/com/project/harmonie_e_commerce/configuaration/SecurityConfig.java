//package com.project.harmonie_e_commerce.configuaration;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
//    // Do not worry about warning, it works!
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .csrf().disable()  // Disable CSRF protection
//            .authorizeHttpRequests().anyRequest().permitAll()  // Allow all requests
//            .and()
//            .formLogin().disable()  // Disable form-based login
//            .httpBasic().disable(); // Disable HTTP Basic authentication
//        return http.build();
//    }
//}
