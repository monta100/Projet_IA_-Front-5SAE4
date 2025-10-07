package com.example.application_nutrition.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller de test pour vérifier la connectivité avec le frontend Angular
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class TestController {

    /**
     * Endpoint de test de santé
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Backend Spring Boot fonctionne correctement");
        response.put("timestamp", System.currentTimeMillis());
        response.put("service", "application_nutrition");
        
        return ResponseEntity.ok(response);
    }

    /**
     * Endpoint de test d'information système
     */
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> info() {
        Map<String, Object> response = new HashMap<>();
        response.put("applicationName", "application_nutrition");
        response.put("version", "1.0.0");
        response.put("javaVersion", System.getProperty("java.version"));
        response.put("springBootVersion", "3.x");
        response.put("database", "MySQL");
        
        return ResponseEntity.ok(response);
    }

    /**
     * Test des endpoints d'authentification
     */
    @GetMapping("/auth/test")
    public ResponseEntity<Map<String, Object>> authTest() {
        Map<String, Object> response = new HashMap<>();
        response.put("authEndpointsAvailable", true);
        response.put("endpoints", new String[]{
            "/api/auth/login",
            "/api/auth/register", 
            "/api/auth/logout",
            "/api/auth/me"
        });
        
        return ResponseEntity.ok(response);
    }

    /**
     * Test CORS
     */
    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/cors-test", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResponseEntity<Map<String, Object>> corsTest() {
        Map<String, Object> response = new HashMap<>();
        response.put("corsEnabled", true);
        response.put("allowedOrigin", "http://localhost:4200");
        response.put("message", "CORS configuré correctement");
        
        return ResponseEntity.ok(response);
    }
}

/*
Instructions pour ajouter ce controller à votre projet Spring Boot:

1. Créez le fichier TestController.java dans le package approprié
2. Assurez-vous que votre application a la configuration CORS suivante:

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}

3. Redémarrez votre application Spring Boot
4. Testez avec le composant Angular backend-test
*/