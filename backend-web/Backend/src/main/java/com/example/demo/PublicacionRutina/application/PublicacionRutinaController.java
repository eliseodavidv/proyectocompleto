package com.example.demo.PublicacionRutina.application;

import com.example.demo.Ejercicio.domain.Ejercicio;
import com.example.demo.Ejercicio.infrastructure.EjercicioRepository;
import com.example.demo.PublicacionRutina.Dtos.AsignarEjerciciosDTO;
import com.example.demo.PublicacionRutina.Dtos.CrearRutinaDTO;
import com.example.demo.PublicacionRutina.Dtos.PublicacionRutinaResponseDTO;
import com.example.demo.PublicacionRutina.Dtos.RutinaConEjerciciosDTO;
import com.example.demo.PublicacionRutina.domain.PublicacionRutina;
import com.example.demo.PublicacionRutina.domain.PublicacionRutinaService;
import com.example.demo.config.JwtService;
import com.example.demo.user.domain.User;
import com.example.demo.user.domain.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/publicaciones/rutinas")
@CrossOrigin(origins = "*")
public class PublicacionRutinaController {

    private final PublicacionRutinaService rutinaService;
    private final EjercicioRepository ejercicioRepository;
    private final JwtService jwtService;
    private final UserService userService;

    @Autowired
    public PublicacionRutinaController(PublicacionRutinaService rutinaService, JwtService jwtService, UserService userService, EjercicioRepository ejercicioRepository) {
        this.rutinaService = rutinaService;
        this.jwtService = jwtService;
        this.userService = userService;
        this.ejercicioRepository = ejercicioRepository;
    }

//    @PostMapping
//    public PublicacionRutinaResponseDTO crearRutina(
//            @RequestBody PublicacionRutina rutina,
//            @RequestHeader("Authorization") String authHeader
//    ) {
//        String token = authHeader.replace("Bearer ", "");
//        Integer userId = jwtService.extractUserId(token);
//
//        User user = userService.findById(userId)
//                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
//
//        rutina.setUser(user);
//
//        PublicacionRutina savedRutina = rutinaService.crearRutina(rutina);
//        return new PublicacionRutinaResponseDTO(savedRutina);  // Devolver solo el DTO
//    }


    @PostMapping
    public PublicacionRutinaResponseDTO crearRutina(
            @RequestBody CrearRutinaDTO dto,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        Integer userId = jwtService.extractUserId(token);

        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Crear objeto PublicacionRutina
        PublicacionRutina rutina = new PublicacionRutina();
        rutina.setTitulo(dto.getTitulo());
        rutina.setDescripcion(dto.getDescripcion());

        // Faltaban estos setters
        rutina.setNombreRutina(dto.getNombreRutina());
        rutina.setDuracion(dto.getDuracion());
        rutina.setFrecuencia(dto.getFrecuencia());
        rutina.setDificultad(dto.getDificultad());
        rutina.setObjetivo(dto.getObjetivo());


        rutina.setUser(user);
        Set<Ejercicio> ejercicios = new HashSet<>(ejercicioRepository.findAllById(dto.getEjercicioIds()));
        rutina.setEjercicios(new ArrayList<>(ejercicios));
        PublicacionRutina saved = rutinaService.crearRutina(rutina);
        return new PublicacionRutinaResponseDTO(saved);
    }



    @GetMapping
    public Page<PublicacionRutinaResponseDTO> obtenerTodas(@RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "6") int size) {
        Page<PublicacionRutina> pagina = rutinaService.obtenerTodas(PageRequest.of(page, size));

        return pagina.map(PublicacionRutinaResponseDTO::new);
    }


    @GetMapping("/{id}")
    public PublicacionRutinaResponseDTO obtenerPorId(@PathVariable Long id) {
        PublicacionRutina rutina = rutinaService.obtenerPorId(id)
                .orElseThrow(() -> new RuntimeException("Rutina no encontrada"));
        return new PublicacionRutinaResponseDTO(rutina);
    }

    @DeleteMapping("/{id}")
    public void eliminarRutina(@PathVariable Long id) {
        rutinaService.eliminarRutina(id);
    }

    @PostMapping("/rutinas/asignar-ejercicios")
    public ResponseEntity<?> asignarEjercicios(@RequestBody AsignarEjerciciosDTO dto) {
        PublicacionRutina rutina = rutinaService.asignarEjercicios(dto.getRutinaId(), dto.getEjerciciosIds());
        return ResponseEntity.ok().body(new RutinaConEjerciciosDTO(rutina));
    }

    @GetMapping("/buscar")
    public List<PublicacionRutinaResponseDTO> buscarPorObjetivo(@RequestParam String objetivo) {
        return rutinaService.buscarPorObjetivo(objetivo).stream()
                .map(PublicacionRutinaResponseDTO::new)
                .collect(Collectors.toList());
    }

}
