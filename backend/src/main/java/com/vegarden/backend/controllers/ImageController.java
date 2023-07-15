package com.vegarden.backend.controllers;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RequestMapping("/api/uploads")
public class ImageController {

    @GetMapping("/avatar_images/{filename:.+}")
    public ResponseEntity<Resource> getAvatarImage(@PathVariable String filename) {
        Resource resource = new ClassPathResource("uploads/avatar_images/" + filename);

        if (resource.exists()) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // Imposta il tipo di contenuto come immagine JPEG, adatta
                                                          // il tipo in base al formato dell'immagine
            return ResponseEntity.ok().headers(headers).body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/cover_images/{filename:.+}")
    public ResponseEntity<Resource> getCoverImage(@PathVariable String filename) {
        Resource resource = new ClassPathResource("uploads/cover_images/" + filename);

        if (resource.exists()) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // Imposta il tipo di contenuto come immagine JPEG, adatta
                                                          // il tipo in base al formato dell'immagine
            return ResponseEntity.ok().headers(headers).body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
