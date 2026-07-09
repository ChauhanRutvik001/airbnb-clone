package com.cr.main.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

/**
 * Swagger API Configuration
 */
@Configuration
public class SwaggerConfig {
	
	/**
	 * Swagger API Configuration
	 * @return
	 */
    @Bean
    OpenAPI customOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Hospital Management System")
                        .version("1.0")
                        .description("Spring Boot REST APIs Documentation")
                        .contact(new Contact()
                                .name("Rutvik Chauhan")
                                .email("rutvikchauhan0002@gmail.com")));
    }
    
}