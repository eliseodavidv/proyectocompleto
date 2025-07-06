package com.example.demo.Ejercicio.domain;

import com.example.demo.Ejercicio.Dtos.CrearEjercicioDTO;
import com.example.demo.Ejercicio.infrastructure.EjercicioRepository;
import com.example.demo.PublicacionRutina.domain.PublicacionRutina;
import com.example.demo.PublicacionRutina.domain.PublicacionRutinaService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
public class EjercicioService {

    private final EjercicioRepository repo;
    private final PublicacionRutinaService rutinaService;

    public EjercicioService(EjercicioRepository repo, PublicacionRutinaService rutinaService) {
        this.repo = repo;
        this.rutinaService = rutinaService;
    }

    public Ejercicio crearEjercicio(CrearEjercicioDTO dto) {
        Ejercicio ej = new Ejercicio();
        ej.setNombre(dto.getNombre());
        ej.setDescripcion(dto.getDescripcion());
        ej.setSeries(dto.getSeries());
        ej.setRepeticiones(dto.getRepeticiones());
        ej.setDescansoSegundos(dto.getDescansoSegundos());
        ej.setPesoKg(dto.getPesoKg());
        ej.setImagenUrl(dto.getImagenUrl());    // nuevo
        return repo.save(ej);
    }


    public List<Ejercicio> obtenerPorRutina(Long rutinaId) {
        PublicacionRutina rutina = rutinaService.obtenerPorId(rutinaId)
                .orElseThrow(() -> new RuntimeException("Rutina no encontrada"));
        return repo.findByRutinas(rutina);
    }


}
