package com.example.demo.PublicacionProgreso.application;

import com.example.demo.PublicacionProgreso.Dtos.PublicacionProgresoDTO;
import com.example.demo.PublicacionProgreso.domain.PublicacionProgreso;
import com.example.demo.PublicacionProgreso.domain.PublicacionProgresoService;
import com.example.demo.config.JwtService;
import com.example.demo.user.domain.User;
import com.example.demo.user.domain.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/publicaciones/progreso")
@CrossOrigin(origins = "*")
public class PublicacionProgresoController {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private PublicacionProgresoService publicacionService;

    @PostMapping
    public PublicacionProgresoDTO crearPublicacion(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam("inicio") @DateTimeFormat(pattern = "yyyy-MM-dd") Date inicio,
            @RequestParam("fin") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fin
    ) {
        String token = authHeader.replace("Bearer ", "");
        Integer userId = jwtService.extractUserId(token);
        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        PublicacionProgreso pub = publicacionService.crearPublicacion(user, inicio, fin);
        return new PublicacionProgresoDTO(pub);
    }
}
