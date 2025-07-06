package com.example.demo.PublicacionPlanAlimentacion.application;

import com.example.demo.PublicacionPlanAlimentacion.Dtos.PublicacionPlanAlimentacionDTO;
import com.example.demo.PublicacionPlanAlimentacion.Dtos.PublicacionPlanAlimentacionResponseDTO;
import com.example.demo.PublicacionPlanAlimentacion.domain.PublicacionPlanAlimentacion;
import com.example.demo.PublicacionPlanAlimentacion.domain.PublicacionPlanAlimentacionService;
import com.example.demo.config.JwtService;
import com.example.demo.user.domain.User;
import com.example.demo.user.domain.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/publicaciones/planes")
@CrossOrigin(origins = "*")
public class PublicacionPlanAlimentacionController {

    private final PublicacionPlanAlimentacionService service;
    private final JwtService jwtService;
    private final UserService userService;

    @Autowired
    public PublicacionPlanAlimentacionController(
            PublicacionPlanAlimentacionService service,
            JwtService jwtService,
            UserService userService
    ) {
        this.service = service;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @PostMapping
    public PublicacionPlanAlimentacionResponseDTO crearPlan(
            @RequestBody PublicacionPlanAlimentacion plan,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        Integer userId = jwtService.extractUserId(token);

        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        plan.setUser(user);
        PublicacionPlanAlimentacion savedPlan = service.crearPlan(plan);
        return new PublicacionPlanAlimentacionResponseDTO(savedPlan);
    }

    @GetMapping
    public List<PublicacionPlanAlimentacionDTO> obtenerTodos() {
        return service.obtenerTodos().stream()
                .map(PublicacionPlanAlimentacionDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public PublicacionPlanAlimentacion obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .orElseThrow(() -> new RuntimeException("Plan de alimentación no encontrado"));
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
