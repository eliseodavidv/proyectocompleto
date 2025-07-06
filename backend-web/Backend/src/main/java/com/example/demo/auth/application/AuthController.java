package com.example.demo.auth.application;

import com.example.demo.auth.domain.AuthService;
import com.example.demo.auth.dto.JwtAuthResponse;
import com.example.demo.auth.dto.LoginReq;
import com.example.demo.auth.dto.RegisterReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginReq req) {
        return ResponseEntity.ok(authService.login(req));
    }

    @PostMapping("/register")
    public ResponseEntity<JwtAuthResponse> register(@RequestBody RegisterReq req) {
        return ResponseEntity.ok(authService.register(req));
    }
    @PostMapping("/admin")
    public ResponseEntity<Object> crearAdmin(@RequestBody RegisterReq req) {
        authService.crearAdmin(req);
        return ResponseEntity.ok("admin creado");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/register/especialista")
    public ResponseEntity<Object> crearEspecialista(@RequestBody RegisterReq req) {
        authService.crearEspecialista(req);
        return ResponseEntity.ok("Especialista creado");
    }
}