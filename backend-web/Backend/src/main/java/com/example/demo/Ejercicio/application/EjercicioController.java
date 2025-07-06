package com.example.demo.Ejercicio.application;

import com.example.demo.Ejercicio.Dtos.CrearEjercicioDTO;
import com.example.demo.Ejercicio.Dtos.EjercicioDTO;
import com.example.demo.Ejercicio.domain.Ejercicio;
import com.example.demo.Ejercicio.domain.EjercicioService;
import com.example.demo.Ejercicio.domain.StorageService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ejercicios")
@CrossOrigin(origins = "*")
public class EjercicioController {

    private final EjercicioService service;
    private final StorageService storageService;

    public EjercicioController(EjercicioService service, StorageService storageService) {
        this.service = service;
        this.storageService = storageService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public EjercicioDTO crearEjercicio(
            @RequestPart("datos") CrearEjercicioDTO dto,
            @RequestPart("imagen") MultipartFile file) {
        String url = storageService.subir(file);   // tu lógica de guardado
        dto.setImagenUrl(url);
        Ejercicio ejercicio = service.crearEjercicio(dto);
        return new EjercicioDTO(ejercicio);
    }


    @GetMapping("/rutina/{rutinaId}")
    public List<EjercicioDTO> obtenerPorRutina(@PathVariable Long rutinaId) {
        return service.obtenerPorRutina(rutinaId).stream()
                .map(EjercicioDTO::new)
                .collect(Collectors.toList());
    }
}
