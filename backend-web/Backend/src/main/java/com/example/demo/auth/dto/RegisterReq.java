package com.example.demo.auth.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
public class RegisterReq {
    @NonNull
    private String name;
    @NonNull
    @Email
    @Column(nullable = false)
    private String email;
    @NonNull
    @Size(min = 6)
    @Column(nullable = false)
    private String password;
}
