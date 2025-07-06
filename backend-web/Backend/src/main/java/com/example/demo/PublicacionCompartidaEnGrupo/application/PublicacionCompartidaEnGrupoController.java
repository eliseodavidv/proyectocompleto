package com.example.demo.PublicacionCompartidaEnGrupo.application;

import com.example.demo.PublicacionCompartidaEnGrupo.domain.PublicacionCompartidaDTO;
import com.example.demo.PublicacionCompartidaEnGrupo.domain.PublicacionCompartidaEnGrupoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publicacionescompartidas")
@RequiredArgsConstructor
public class PublicacionCompartidaEnGrupoController {
    private final PublicacionCompartidaEnGrupoService compartidaService;

    @PostMapping("/{publicacionId}/compartir")
    public ResponseEntity<String> compartirEnGrupo(
            @PathVariable int publicacionId,
            @RequestParam int grupoId) {
        compartidaService.compartirPublicacionConGrupo(publicacionId, grupoId);
        return ResponseEntity.ok("Publicación compartida en el grupo correctamente.");
    }

    @GetMapping("/grupo/{grupoId}")
    public ResponseEntity<?> obtenerPorGrupo(@PathVariable int grupoId) {
        return ResponseEntity.ok(compartidaService.obtenerPorGrupoDTO(grupoId));
    }

}
