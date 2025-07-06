package com.example.demo.Progreso.application;

import com.example.demo.Progreso.Dtos.ProgresoDTO;
import com.example.demo.Progreso.Dtos.ProgresoRequestDTO;
import com.example.demo.Progreso.Dtos.ProgresoResponseDTO;
import com.example.demo.Progreso.domain.Progreso;
import com.example.demo.Progreso.domain.ProgresoService;
import com.example.demo.config.JwtService;
import com.example.demo.user.domain.User;
import com.example.demo.user.domain.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/progresos")
@CrossOrigin(origins = "*")
public class ProgresoController {

    private final ProgresoService progresoService;
    private final JwtService jwtService;
    private final UserService userService;

    @Autowired
    public ProgresoController(ProgresoService progresoService, JwtService jwtService, UserService userService) {
        this.progresoService = progresoService;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @PostMapping
    public ProgresoResponseDTO crearProgreso(@RequestBody ProgresoRequestDTO progresoDTO,
                                             @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        Integer userId = jwtService.extractUserId(token);

        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Progreso progreso = new Progreso();
        progreso.setPeso(progresoDTO.getPeso());
        progreso.setFecha(progresoDTO.getFecha());
        progreso.setUser(user);

        Progreso savedProgreso = progresoService.crearProgreso(progreso);
        return new ProgresoResponseDTO(savedProgreso);
    }

    @GetMapping
    public List<ProgresoResponseDTO> obtenerPorUsuario(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        Integer userId = jwtService.extractUserId(token);

        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<Progreso> progresos = progresoService.obtenerPorUsuario(user);
        return progresos.stream()
                .map(ProgresoResponseDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Progreso obtenerPorId(@PathVariable Long id) {
        return progresoService.obtenerPorId(id)
                .orElseThrow(() -> new RuntimeException("Progreso no encontrado"));
    }

    @DeleteMapping("/{id}")
    public void eliminarProgreso(@PathVariable Long id) {
        progresoService.eliminarProgreso(id);
    }
}
