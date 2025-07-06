package com.example.demo.VerificacionPublicacion.application;


import com.example.demo.VerificacionPublicacion.domain.VerificacionPublicacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/verificacion")
@RequiredArgsConstructor
public class VerificacionPublicacionController {

    private final VerificacionPublicacionService verificacionService;

    @PostMapping("/{publicacionId}/verificar")
    public ResponseEntity<String> verificar(
            @PathVariable int publicacionId,
            @RequestParam int especialistaId
    ) {
        verificacionService.verificarPublicacion(publicacionId, especialistaId);
        return ResponseEntity.ok("Publicación verificada correctamente");
    }
}
