# Guide d'Intégration Spring Boot pour Nutrition Coaching

## Configuration Spring Boot recommandée

Basé sur votre `application.properties`, voici les configurations additionnelles recommandées :

### application.properties (ajouts recommandés)
```properties
# Port du serveur (optionnel, 8080 par défaut)
server.port=8080

# Configuration CORS pour Angular
spring.web.cors.allowed-origins=http://localhost:4200
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true

# Configuration JWT (si vous utilisez JWT)
jwt.secret=votre-secret-key-tres-long-et-securise
jwt.expiration=86400000

# Configuration de pagination par défaut
spring.data.web.pageable.default-page-size=10
spring.data.web.pageable.max-page-size=100
```

## Structure des Controllers Spring Boot

### 1. AuthController
```java
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest loginRequest) {
        // Votre logique de connexion
        AuthResponse authResponse = authService.authenticate(loginRequest);
        return ResponseEntity.ok(new ApiResponse<>(true, authResponse, "Connexion réussie"));
    }
    
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody RegisterRequest registerRequest) {
        // Votre logique d'inscription
        AuthResponse authResponse = authService.register(registerRequest);
        return ResponseEntity.ok(new ApiResponse<>(true, authResponse, "Inscription réussie"));
    }
    
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<User>> getCurrentUser(HttpServletRequest request) {
        // Récupérer l'utilisateur à partir du token JWT
        User user = authService.getCurrentUser(request);
        return ResponseEntity.ok(new ApiResponse<>(true, user, null));
    }
    
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        return ResponseEntity.ok(new ApiResponse<>(true, null, "Déconnexion réussie"));
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(@RequestBody RefreshTokenRequest request) {
        AuthResponse authResponse = authService.refreshToken(request.getRefreshToken());
        return ResponseEntity.ok(new ApiResponse<>(true, authResponse, null));
    }
}
```

### 2. UserController
```java
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserProfile>> getProfile(HttpServletRequest request) {
        UserProfile profile = userService.getUserProfile(request);
        return ResponseEntity.ok(new ApiResponse<>(true, profile, null));
    }
    
    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserProfile>> updateProfile(
            @RequestBody UserProfileUpdateRequest request,
            HttpServletRequest httpRequest) {
        UserProfile updatedProfile = userService.updateProfile(request, httpRequest);
        return ResponseEntity.ok(new ApiResponse<>(true, updatedProfile, "Profil mis à jour"));
    }
    
    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @RequestBody ChangePasswordRequest request,
            HttpServletRequest httpRequest) {
        userService.changePassword(request, httpRequest);
        return ResponseEntity.ok(new ApiResponse<>(true, null, "Mot de passe modifié"));
    }
    
    @PostMapping("/avatar")
    public ResponseEntity<ApiResponse<AvatarResponse>> uploadAvatar(
            @RequestParam("avatar") MultipartFile file,
            HttpServletRequest request) {
        AvatarResponse response = userService.uploadAvatar(file, request);
        return ResponseEntity.ok(new ApiResponse<>(true, response, "Avatar mis à jour"));
    }
}
```

### 3. NutritionController
```java
@RestController
@RequestMapping("/api/nutrition")
@CrossOrigin(origins = "http://localhost:4200")
public class NutritionController {
    
    @GetMapping("/plans")
    public ResponseEntity<PaginatedResponse<NutritionPlan>> getNutritionPlans(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortOrder,
            HttpServletRequest request) {
        
        Pageable pageable = PageRequest.of(page, size, 
            Sort.by(Sort.Direction.fromString(sortOrder), sortBy));
        
        Page<NutritionPlan> plans = nutritionService.getUserPlans(request, pageable);
        
        PaginatedResponse<NutritionPlan> response = new PaginatedResponse<>();
        response.setData(plans.getContent());
        response.setPagination(new PaginationInfo(
            page, size, plans.getTotalElements(), plans.getTotalPages()
        ));
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/plans")
    public ResponseEntity<ApiResponse<NutritionPlan>> createPlan(
            @RequestBody NutritionPlanRequest request,
            HttpServletRequest httpRequest) {
        NutritionPlan plan = nutritionService.createPlan(request, httpRequest);
        return ResponseEntity.ok(new ApiResponse<>(true, plan, "Plan créé avec succès"));
    }
    
    @GetMapping("/plans/{id}")
    public ResponseEntity<ApiResponse<NutritionPlan>> getPlan(
            @PathVariable Long id,
            HttpServletRequest request) {
        NutritionPlan plan = nutritionService.getPlan(id, request);
        return ResponseEntity.ok(new ApiResponse<>(true, plan, null));
    }
    
    @GetMapping("/tracker")
    public ResponseEntity<ApiResponse<NutritionTracker>> getTracker(
            @RequestParam String date,
            HttpServletRequest request) {
        NutritionTracker tracker = nutritionService.getTracker(date, request);
        return ResponseEntity.ok(new ApiResponse<>(true, tracker, null));
    }
    
    @PostMapping("/tracker")
    public ResponseEntity<ApiResponse<NutritionTracker>> updateTracker(
            @RequestBody NutritionTrackerRequest request,
            HttpServletRequest httpRequest) {
        NutritionTracker tracker = nutritionService.updateTracker(request, httpRequest);
        return ResponseEntity.ok(new ApiResponse<>(true, tracker, "Suivi mis à jour"));
    }
    
    @GetMapping("/foods/search")
    public ResponseEntity<ApiResponse<List<Food>>> searchFoods(@RequestParam String q) {
        List<Food> foods = nutritionService.searchFoods(q);
        return ResponseEntity.ok(new ApiResponse<>(true, foods, null));
    }
    
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<NutritionStats>> getStats(
            @RequestParam String period,
            HttpServletRequest request) {
        NutritionStats stats = nutritionService.getStats(period, request);
        return ResponseEntity.ok(new ApiResponse<>(true, stats, null));
    }
}
```

## Classes DTO recommandées

### ApiResponse.java
```java
public class ApiResponse<T> {
    private boolean success;
    private T data;
    private String message;
    private List<String> errors;
    
    // Constructeurs, getters, setters
    public ApiResponse(boolean success, T data, String message) {
        this.success = success;
        this.data = data;
        this.message = message;
    }
}
```

### PaginatedResponse.java
```java
public class PaginatedResponse<T> {
    private List<T> data;
    private PaginationInfo pagination;
    
    // Getters, setters
}

public class PaginationInfo {
    private int page;
    private int limit;
    private long total;
    private int pages;
    
    // Constructeurs, getters, setters
}
```

### AuthResponse.java
```java
public class AuthResponse {
    private User user;
    private String token;
    private String refreshToken;
    private long expiresIn;
    
    // Constructeurs, getters, setters
}
```

## Configuration CORS

### WebConfig.java
```java
@Configuration
@EnableWebMvc
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
```

## Configuration JWT (optionnelle)

### JwtAuthenticationFilter.java
```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                  HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            // Valider et traiter le token JWT
        }
        
        filterChain.doFilter(request, response);
    }
}
```

## Structure de base de données MySQL

### Tables recommandées
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    avatar VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE nutrition_plans (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    target_calories INT NOT NULL,
    proteins DECIMAL(10,2),
    carbohydrates DECIMAL(10,2),
    fats DECIMAL(10,2),
    duration_days INT,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE nutrition_tracker (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    track_date DATE NOT NULL,
    total_calories INT,
    total_proteins DECIMAL(10,2),
    total_carbohydrates DECIMAL(10,2),
    total_fats DECIMAL(10,2),
    water_intake DECIMAL(5,2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Prochaines étapes

1. Implémentez les controllers ci-dessus dans votre projet Spring Boot
2. Configurez la sécurité et CORS
3. Créez les entités JPA correspondantes
4. Testez les endpoints avec Postman
5. Lancez votre frontend Angular avec `ng serve`

Le frontend Angular est déjà configuré pour fonctionner avec cette structure !