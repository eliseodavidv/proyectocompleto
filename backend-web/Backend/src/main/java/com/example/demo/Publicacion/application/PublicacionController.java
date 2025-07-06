package com.example.demo.Publicacion.application;

import com.example.demo.Publicacion.Dtos.PublicacionRequestDTO;
import com.example.demo.Publicacion.Dtos.PublicacionResponseDTO;
import com.example.demo.Publicacion.domain.Publicacion;
import com.example.demo.Publicacion.domain.PublicacionService;
import com.example.demo.config.JwtService;
import com.example.demo.user.domain.User;
import com.example.demo.user.domain.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/publicaciones")
@CrossOrigin(origins = "*")
public class PublicacionController {

    @Autowired
    private PublicacionService publicacionService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @PostMapping
    public PublicacionResponseDTO crear(
            @RequestBody PublicacionRequestDTO request,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        Integer userId = jwtService.extractUserId(token);

        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Publicacion p = publicacionService.crear(
                request.getTitulo(),
                request.getContenido(),
                user.getId()
        );

        return new PublicacionResponseDTO(
                p.getId_publicacion(),
                p.getTitulo(),
                p.getContenido(),
                p.getFechaCreacion(),
                p.getUser().getName(),
                p.isVerificada()
        );
    }

    @GetMapping
    public List<PublicacionResponseDTO> listar() {
        return publicacionService.listarTodas().stream().map(p -> new PublicacionResponseDTO(
                p.getId_publicacion(),
                p.getTitulo(),
                p.getContenido(),
                p.getFechaCreacion(),
                p.getUser().getName(),
                p.isVerificada()
        )).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public PublicacionResponseDTO obtenerPorId(@PathVariable Integer id) {
        Publicacion p = publicacionService.obtenerPorId(id);
        return new PublicacionResponseDTO(
                p.getId_publicacion(),
                p.getTitulo(),
                p.getContenido(),
                p.getFechaCreacion(),
                p.getUser().getName(),
                p.isVerificada()
        );
    }


    @GetMapping("/autor")
    public List<PublicacionResponseDTO> listarPorAutor(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        Integer userId = jwtService.extractUserId(token);

        return publicacionService.listarPorAutor(userId).stream().map(p -> new PublicacionResponseDTO(
                p.getId_publicacion(),
                p.getTitulo(),
                p.getContenido(),
                p.getFechaCreacion(),
                p.getUser().getName(),
                p.isVerificada()
        )).collect(Collectors.toList());
    }

}
