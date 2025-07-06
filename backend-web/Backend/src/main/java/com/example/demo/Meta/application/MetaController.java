package com.example.demo.Meta.application;

import com.example.demo.Meta.Dtos.MetaDTO;
import com.example.demo.Meta.domain.Meta;
import com.example.demo.Meta.domain.MetaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/metas")
@RequiredArgsConstructor
public class MetaController {

    private final MetaService metaService;

    @PostMapping("/crear")
    public ResponseEntity<MetaDTO> crearMeta(@RequestBody Meta meta, @RequestParam int userId) {
        Meta nueva = metaService.crearMeta(meta, userId);
        MetaDTO dto = new MetaDTO(
                nueva.getId(),
                nueva.getDescripcion(),
                nueva.getFechaInicio(),
                nueva.getFechaFin(),
                nueva.isCumplida(),
                nueva.getUser().getId()
        );
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/usuario/{userId}")
    public ResponseEntity<List<MetaDTO>> obtenerMetas(@PathVariable int userId) {
        List<MetaDTO> metas = metaService.obtenerMetasDeUsuario(userId).stream().map(meta ->
                new MetaDTO(
                        meta.getId(),
                        meta.getDescripcion(),
                        meta.getFechaInicio(),
                        meta.getFechaFin(),
                        meta.isCumplida(),
                        meta.getUser().getId()
                )
        ).collect(Collectors.toList());

        return ResponseEntity.ok(metas);
    }

    @PutMapping("/{metaId}/cumplida")
    public ResponseEntity<String> marcarComoCumplida(@PathVariable Long metaId) {
        metaService.marcarComoCumplida(metaId);
        return ResponseEntity.ok("Meta marcada como cumplida");
    }
}
