package com.example.demo.Grupo.application;

import com.example.demo.Grupo.Dtos.GrupoDTO;
import com.example.demo.Grupo.domain.Grupo;
import com.example.demo.Grupo.domain.GrupoService;
import com.example.demo.Grupo.infrastructure.GrupoRepository;
import com.example.demo.Publicacion.Dtos.PublicacionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/grupos")
@RequiredArgsConstructor
public class GrupoController {

    private final GrupoService grupoService;
    private final GrupoRepository grupoRepository;

    @PostMapping("/crear")
    public ResponseEntity<Grupo> crearGrupo(@RequestParam Integer adminId, @RequestBody Grupo grupo) {
        // Verificar si ya existe un grupo con el mismo nombre
        if (grupoRepository.existsByNombre(grupo.getNombre())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(null); // Puedes retornar un mensaje o un objeto vacío si lo prefieres
        }

        // Si no existe, proceder con la creación del grupo
        Grupo creado = grupoService.crearGrupo(adminId, grupo);
        return ResponseEntity.ok(creado);
    }

    @GetMapping
    public ResponseEntity<List<GrupoDTO>> getGrupos() {
        List<Grupo> grupos = grupoService.listarGrupos();
        List<GrupoDTO> grupoDTOs = grupos.stream()
                .map(GrupoDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(grupoDTOs);
    }


    @PostMapping("/{grupoId}/agregar-miembro")
    public ResponseEntity<String> agregarMiembro(@PathVariable Integer grupoId, @RequestParam Integer userId) {
        grupoService.agregarMiembro(grupoId, userId);
        return ResponseEntity.ok("Miembro agregado correctamente");
    }

    @PostMapping("/{id}/unirse")
    public ResponseEntity<String> unirseAGrupo(@PathVariable int id, @RequestParam int userId) {
        grupoService.unirseAGrupo(id, userId);
        return ResponseEntity.ok("Usuario unido al grupo");
    }

    @GetMapping("/publicos")
    public ResponseEntity<List<GrupoDTO>> getGruposPublicos() {
        List<Grupo> grupos = grupoService.obtenerGruposPublicos();
        List<GrupoDTO> dtos = grupos.stream().map(GrupoDTO::new).toList();
        return ResponseEntity.ok(dtos);
    }


    @PutMapping("/{id}/editar")
    public ResponseEntity<Grupo> editarGrupo(@PathVariable Integer id, @RequestBody Grupo grupoActualizado) {
        Grupo grupo = grupoService.editarGrupo(id, grupoActualizado);
        return ResponseEntity.ok(grupo);
    }

    @GetMapping("/mis")
    public ResponseEntity<List<GrupoDTO>> getMisGrupos(@RequestParam Integer userId) {
        List<Grupo> grupos = grupoService.obtenerGruposPorUsuario(userId);
        List<GrupoDTO> dtos = grupos.stream().map(GrupoDTO::new).toList();
        return ResponseEntity.ok(dtos);
    }

}
