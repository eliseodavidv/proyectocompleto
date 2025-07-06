package com.example.demo.user.Dtos;

import com.example.demo.user.domain.Role;
import com.example.demo.user.domain.User;
import lombok.Data;

@Data
public class UserDTO {
    private int id;
    private String name;
    private String email;
    private Role role;

    // Constructor, getters y setters

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole();
    }
}
