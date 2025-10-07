# 🚀 Nutrition Coaching - Intégration Frontend Angular + Backend Spring Boot

## 📋 Vue d'ensemble

Ce projet intègre un frontend Angular avec un backend Spring Boot pour une application de coaching nutritionnel. L'intégration est complète avec :

- ✅ Configuration HTTP Client Angular
- ✅ Services API (Auth, User, Nutrition)
- ✅ Modèles TypeScript
- ✅ Intercepteurs HTTP (Auth + Erreurs)
- ✅ Composants d'exemple (Login, Test de connexion)
- ✅ Configuration d'environnement
- ✅ Guide d'intégration Spring Boot

## 🛠️ Configuration

### Frontend Angular (Port 4200)

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
ng serve
```

### Backend Spring Boot (Port 8080)

Votre backend Spring Boot doit être configuré avec :

1. **Port 8080** (défaut Spring Boot)
2. **Base de données MySQL** (déjà configurée dans application.properties)
3. **Configuration CORS** pour autoriser http://localhost:4200

## 📁 Structure du projet

```
src/app/
├── models/                     # Interfaces TypeScript
│   ├── user.model.ts          # Modèles utilisateur
│   ├── nutrition.model.ts     # Modèles nutrition  
│   └── index.ts               # Export des modèles
├── services/                   # Services API
│   ├── auth.service.ts        # Service d'authentification
│   ├── user.service.ts        # Service utilisateur
│   ├── nutrition.service.ts   # Service nutrition
│   ├── backend-test.service.ts # Service de test backend
│   └── index.ts               # Export des services
├── interceptors/              # Intercepteurs HTTP
│   ├── auth.interceptor.ts    # Gestion automatique des tokens
│   ├── error.interceptor.ts   # Gestion des erreurs HTTP
│   └── index.ts               # Export des intercepteurs
├── Pages/                     # Composants de pages
│   ├── auth/login/           # Composant de connexion
│   ├── test/                 # Composant de test backend
│   ├── header/               # Header avec auth
│   ├── home/                 # Page d'accueil
│   └── footer/               # Footer
└── environments/             # Configuration d'environnement
    ├── environment.ts        # Configuration développement
    └── environment.prod.ts   # Configuration production
```

## 🔧 Configuration Backend Spring Boot

### 1. Ajouter le TestController

Copiez le fichier `TestController.java` dans votre projet Spring Boot pour tester la connexion.

### 2. Configuration CORS

Ajoutez cette configuration à votre projet Spring Boot :

```java
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
```

### 3. Endpoints attendus

Consultez le fichier `SPRING_BOOT_INTEGRATION_GUIDE.md` pour la liste complète des endpoints et leur implémentation.

## 🧪 Test de l'intégration

### 1. Démarrer le backend Spring Boot
```bash
# Dans votre projet Spring Boot
mvn spring-boot:run
# ou
./gradlew bootRun
```

### 2. Démarrer le frontend Angular
```bash
# Dans ce projet
ng serve
```

### 3. Tester la connexion

Accédez à : `http://localhost:4200/test` (si vous ajoutez la route)

Ou utilisez le composant `BackendTestComponent` dans votre application.

## 📱 Utilisation des services

### Service d'authentification

```typescript
// Injection du service
constructor(private authService: AuthService) {}

// Connexion
this.authService.login({email: 'user@example.com', password: 'password'})
  .subscribe(response => console.log('Connecté:', response));

// Vérifier si connecté
if (this.authService.isAuthenticated()) {
  // Utilisateur connecté
}

// Obtenir l'utilisateur actuel
this.authService.currentUser$.subscribe(user => {
  console.log('Utilisateur actuel:', user);
});
```

### Service Nutrition

```typescript
// Injection du service
constructor(private nutritionService: NutritionService) {}

// Obtenir les plans nutritionnels
this.nutritionService.getNutritionPlans()
  .subscribe(plans => console.log('Plans:', plans));

// Créer un plan
this.nutritionService.createNutritionPlan(planData)
  .subscribe(plan => console.log('Plan créé:', plan));

// Suivi nutritionnel
this.nutritionService.getNutritionTracker('2025-10-07')
  .subscribe(tracker => console.log('Suivi:', tracker));
```

### Service Utilisateur

```typescript
// Injection du service
constructor(private userService: UserService) {}

// Obtenir le profil
this.userService.getProfile()
  .subscribe(profile => console.log('Profil:', profile));

// Mettre à jour le profil
this.userService.updateProfile({firstName: 'John'})
  .subscribe(user => console.log('Profil mis à jour:', user));
```

## 🔐 Authentification automatique

L'intercepteur `AuthInterceptor` ajoute automatiquement le token JWT à toutes les requêtes API. Le token est stocké dans `localStorage` et persiste entre les sessions.

## 🚨 Gestion d'erreurs

L'intercepteur `ErrorInterceptor` gère automatiquement :
- Erreurs de réseau
- Erreurs HTTP (401, 403, 404, 500, etc.)
- Refresh automatique des tokens expirés
- Messages d'erreur utilisateur-friendly

## 📝 Prochaines étapes

1. **Implémenter les controllers Spring Boot** selon le guide
2. **Créer les entités JPA** pour la base de données
3. **Configurer la sécurité Spring Security** (optionnel)
4. **Ajouter les routes Angular** pour les nouveaux composants
5. **Personnaliser les interfaces** selon vos besoins métier

## 🆘 Résolution de problèmes

### Backend non accessible
- Vérifiez que Spring Boot fonctionne sur le port 8080
- Vérifiez la configuration CORS
- Consultez les logs du backend

### Erreurs CORS
- Ajoutez la configuration CORS dans Spring Boot
- Vérifiez que l'origine `http://localhost:4200` est autorisée

### Erreurs d'authentification
- Vérifiez l'implémentation des endpoints `/api/auth/*`
- Vérifiez le format des réponses API
- Consultez la console du navigateur pour les erreurs

## 📚 Documentation

- `SPRING_BOOT_INTEGRATION_GUIDE.md` - Guide détaillé Spring Boot
- `BACKEND_INTEGRATION_GUIDE.md` - Guide général d'intégration
- `TestController.java` - Controller de test pour Spring Boot

## 🤝 Support

Pour toute question ou problème d'intégration, consultez les guides inclus ou contactez l'équipe de développement.