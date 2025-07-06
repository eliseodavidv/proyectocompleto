package com.example.demo.user.domain;

import com.example.demo.events.HelloEmailEvent;
import com.example.demo.user.infrastructure.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public  class UserService {

    @Autowired
    private final UserRepository<User> userRepository;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @Autowired
    public UserService(UserRepository<User> userRepository) {
        this.userRepository = userRepository;
    }

    public User findByEmail(String username, String role) {
        User usuario;
        usuario = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Usuario no autorizado"));
        return usuario;
    }

    @Bean(name = "UserDetailsService")
    public UserDetailsService userDetailsService() {
        return username -> {
            User user = userRepository.findByEmail(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            return (UserDetails) user;
        };
    }

    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }

}


