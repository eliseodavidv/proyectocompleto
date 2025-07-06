package com.example.demo.Grupo.domain;

import com.example.demo.Grupo.infrastructure.GrupoRepository;
import com.example.demo.Publicacion.domain.Publicacion;
import com.example.demo.Publicacion.infrastructure.PublicacionRepository;
import com.example.demo.user.domain.User;
import com.example.demo.user.infrastructure.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GrupoService {

    private final GrupoRepository grupoRepository;
    private final UserRepository<User> userRepository;
    private final PublicacionRepository publicacionRepository;

    @Transactional
    public Grupo crearGrupo(Integer adminId, Grupo grupo) {
        if (grupoRepository.existsByNombre(grupo.getNombre())) {
            throw new IllegalArgumentException("Ya existe un grupo con el mismo nombre");
        }

        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario administrador no encontrado"));

        grupo.setAdministrador(admin);
        grupo.getMiembros().add(admin); // Admin también es miembro
        return grupoRepository.save(grupo);
    }


    public List<Grupo> listarGrupos() {
        return grupoRepository.findAll();
    }

    public Optional<Grupo> obtenerGrupoPorId(Integer id) {
        return grupoRepository.findById(id);
    }

    @Transactional
    public void agregarMiembro(Integer grupoId, Integer userId) {
        Grupo grupo = grupoRepository.findById(grupoId)
                .orElseThrow(() -> new IllegalArgumentException("Grupo no encontrado"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        grupo.getMiembros().add(user);
        grupoRepository.save(grupo);
    }

    public void unirseAGrupo(int grupoId, int userId) {
        Grupo grupo = grupoRepository.findById(grupoId)
                .orElseThrow(() -> new RuntimeException("Grupo no encontrado"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!grupo.getMiembros().contains(user)) {
            grupo.getMiembros().add(user);
            grupoRepository.save(grupo);
        } else {
            throw new RuntimeException("El usuario ya es miembro del grupo");
        }
    }

    public List<Grupo> obtenerGruposPublicos() {
        return grupoRepository.findByTipo( TipoGrupo.PUBLICO );
    }

    @Transactional
    public Grupo editarGrupo(Integer id, Grupo grupoActualizado) {
        Grupo grupoExistente = grupoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Grupo no encontrado"));

        grupoExistente.setNombre(grupoActualizado.getNombre());
        grupoExistente.setDescripcion(grupoActualizado.getDescripcion());
        grupoExistente.setTipo(grupoActualizado.getTipo());

        return grupoRepository.save(grupoExistente);
    }

    public List<Grupo> obtenerGruposPorUsuario(Integer userId) {
        return grupoRepository.findByMiembros_Id(userId);
    }

}
