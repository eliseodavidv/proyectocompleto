package com.example.demo.Ejercicio.domain;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;

@Service
public class StorageService {

    private final Path root = Paths.get("uploads");

    public StorageService() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("No se pudo crear el directorio para archivos.");
        }
    }

    public String subir(MultipartFile file) {
        try {
            String nombreArchivo = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path destino = root.resolve(nombreArchivo);
            Files.copy(file.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/" + nombreArchivo; // Ruta accesible desde el frontend
        } catch (Exception e) {
            throw new RuntimeException("No se pudo guardar el archivo. Error: " + e.getMessage());
        }
    }
}
