package com.example.demo.PublicacionGrupo.application;

import com.example.demo.PublicacionGrupo.domain.PublicacionGrupo;
import com.example.demo.PublicacionGrupo.domain.PublicacionGrupoDTO;
import com.example.demo.PublicacionGrupo.domain.PublicacionGrupoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publicaciones/grupo")
@RequiredArgsConstructor
public class PublicacionGrupoController {

    private final PublicacionGrupoService publicacionGrupoService;

    @PostMapping("/crear")
    public ResponseEntity<String> crearPublicacionEnGrupo(
            @RequestParam String titulo,
            @RequestParam String contenido,
            @RequestParam int userId,
            @RequestParam int grupoId
    ) {
        publicacionGrupoService.crearPublicacionEnGrupo(titulo, contenido, userId, grupoId);
        return ResponseEntity.ok("Publicación en grupo creada exitosamente");
    }

    @GetMapping("/por-grupo/{grupoId}")
    public ResponseEntity<List<PublicacionGrupoDTO>> getPublicacionesPorGrupo(@PathVariable int grupoId) {
        List<PublicacionGrupoDTO> publicaciones = publicacionGrupoService.obtenerPublicacionesDTOPorGrupoId(grupoId);
        return ResponseEntity.ok(publicaciones);
    }


}
