package com.example.demo.Comentario.application;

import com.example.demo.Comentario.Dtos.ComentarioRequestDTO;
import com.example.demo.Comentario.Dtos.ComentarioResponseDTO;
import com.example.demo.Comentario.domain.Comentario;
import com.example.demo.Comentario.domain.ComentarioService;
import com.example.demo.config.JwtService;
import com.example.demo.user.domain.User;
import com.example.demo.user.domain.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comentarios")
@CrossOrigin(origins = "*")
public class ComentarioController {

    private final ComentarioService comentarioService;
    private final JwtService jwtService;
    private final UserService userService;

    @Autowired
    public ComentarioController(ComentarioService comentarioService, JwtService jwtService, UserService userService) {
        this.comentarioService = comentarioService;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @PostMapping
    public ComentarioResponseDTO crearComentario(
            @RequestBody ComentarioRequestDTO request,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        Integer userId = jwtService.extractUserId(token);

        // Buscar al autor del comentario (usuario)
        User autor = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Crear comentario con el contenido y la ID de la publicación
        Comentario comentario = comentarioService.crearComentario(request.getContenido(), Math.toIntExact(request.getPublicacionId()), autor);

        // Crear DTO de respuesta
        return new ComentarioResponseDTO(
                comentario.getId(),
                comentario.getContenido(),
                comentario.getFechaCreacion(),
                comentario.getAutor().getName() // Suponiendo que 'getName' devuelve el nombre del autor
        );
    }

    @GetMapping("/publicacion/{id}")
    public List<ComentarioResponseDTO> obtenerComentariosDePublicacion(@PathVariable Integer id) {
        // Obtener todos los comentarios de la publicación especificada
        return comentarioService.obtenerComentariosPorPublicacion(id)
                .stream()
                .map(comentario -> new ComentarioResponseDTO(
                        comentario.getId(),
                        comentario.getContenido(),
                        comentario.getFechaCreacion(),
                        comentario.getAutor().getName() // Obtener el nombre del autor
                ))
                .collect(Collectors.toList());
    }
}
