package com.project.harmonie_e_commerce;

//import com.project.harmonie_e_commerce.configuaration.SecurityConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude =
		org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class)
public class HarmonieECommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(HarmonieECommerceApplication.class, args);
	}

}
