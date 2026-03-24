package com.example.qly_kho.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.qly_kho.entity.User;
import com.example.qly_kho.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initUsers() {
        return args -> {

            if (userRepository.findByUsername("admin").isEmpty()) {

                User user = User.createUser(
                        "admin@gmail.com",
                        passwordEncoder.encode("123456"),
                        "admin@gmail.com",
                        "System Admin"
                );

                userRepository.save(user);
            }

        };
    }
}