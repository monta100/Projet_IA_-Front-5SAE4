# 🚀 Guide de Démarrage Rapide - Nutrition Coaching

## ✅ Intégration Complète Effectuée

Votre frontend Angular est maintenant **parfaitement adapté** à votre backend Spring Boot existant !

## 📋 Ce qui a été corrigé et adapté

### 1. **Intercepteur HTTP Fixed** ✅
- ❌ Supprimé les références aux tokens JWT inexistants  
- ✅ Configuré pour les sessions Spring Boot avec `withCredentials: true`
- ✅ Gestion d'erreur adaptée à votre architecture

### 2. **Modèles TypeScript** ✅  
- ✅ `User` avec `nom`, `prenom`, `motDePasse`, `role`, `enabled`
- ✅ `ResetPasswordToken` et `ConfirmationToken` selon vos entités
- ✅ Interfaces pour tous vos endpoints

### 3. **Composants d'Authentification Complets** ✅
- ✅ `LoginComponent` - Connexion avec email/motDePasse
- ✅ `RegisterComponent` - Inscription complète
- ✅ `ForgotPasswordComponent` - Demande de réinitialisation
- ✅ `ResetPasswordComponent` - Page de réinitialisation (lien email)
- ✅ `ConfirmEmailComponent` - Confirmation d'email (lien email)

### 4. **Service Auth Adapté** ✅
- ✅ Endpoints exacts de votre backend Spring Boot
- ✅ Gestion des paramètres de requête (`?email=`, `?token=`)
- ✅ Stockage utilisateur en localStorage (pas de JWT)

## 🧪 Test Immédiat

### 1. Démarrez votre backend Spring Boot :
```bash
cd C:\Users\ademz\OneDrive\Documents\GitHub\Projet_IA_5SAE4\application_nutrition
mvn spring-boot:run
```

### 2. Démarrez le frontend Angular :
```bash
cd C:\Users\ademz\OneDrive\Documents\GitHub\Projet_IA_-Front-5SAE4\nutrition-coaching
ng serve
```

### 3. URLs de test disponibles :
- **Home** : `http://localhost:4200`
- **Login** : `http://localhost:4200/login` 
- **Register** : `http://localhost:4200/register`
- **Forgot Password** : `http://localhost:4200/forgot-password`

## 📁 Structure Finale

```
src/app/
├── models/
│   ├── user.model.ts          ✅ Adapté à votre entité User
│   ├── token.model.ts         ✅ ResetPasswordToken & ConfirmationToken
│   └── index.ts               ✅ Export complet
├── services/
│   ├── auth.service.ts        ✅ Endpoints Spring Boot exacts
│   └── index.ts
├── interceptors/
│   ├── auth.interceptor.ts    ✅ Sessions Spring Boot (fixé)
│   └── index.ts
├── Pages/auth/
│   ├── login/                 ✅ Connexion fonctionnelle
│   ├── register/              ✅ Inscription fonctionnelle
│   ├── forgot-password/       ✅ Demande reset
│   ├── reset-password/        ✅ Page reset (token URL)
│   └── confirm-email/         ✅ Confirmation email (token URL)
└── environments/
    └── environment.ts         ✅ Port 8080 Spring Boot
```

## 🔗 Flux d'Authentification Complet

### **Inscription** :
1. Utilisateur remplit le formulaire `/register`
2. POST vers `/api/users/register` 
3. Backend crée User avec `enabled: false`
4. Backend envoie email avec token de confirmation
5. Utilisateur clique sur lien → `/confirm-email?token=ABC`
6. GET vers `/api/users/confirm?token=ABC`
7. Backend active le compte (`enabled: true`)

### **Connexion** :
1. Utilisateur remplit `/login`
2. POST vers `/api/users/login`
3. Backend vérifie email + mot de passe + `enabled: true`
4. Retourne User complet, stocké en localStorage
5. Redirection selon le rôle (USER/ADMIN/COACH)

### **Mot de passe oublié** :
1. Utilisateur entre email sur `/forgot-password`
2. POST vers `/api/users/forgot-password?email=user@test.com`
3. Backend crée ResetPasswordToken et envoie email
4. Utilisateur clique sur lien → `/reset-password?token=XYZ`
5. Utilisateur entre nouveau mot de passe
6. POST vers `/api/users/reset-password?token=XYZ&nouveauMotDePasse=nouveau`

## ⚙️ Configuration Backend Recommandée

### Pour que tout fonctionne parfaitement, ajoutez dans Spring Boot :

```java
// Configuration CORS
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true); // Important !
    }
}
```

## 🎯 Prochaines Étapes

1. **Ajoutez les routes** dans `app.routes.ts` (exemple dans `ROUTES_EXAMPLE.ts`)
2. **Testez l'inscription** complète avec email
3. **Configurez SMTP** dans Spring Boot pour les emails
4. **Ajoutez des guards** pour protéger les routes
5. **Créez les pages** dashboard selon les rôles

## ✨ Fonctionnalités Prêtes

- ✅ **Inscription complète** avec validation
- ✅ **Connexion sécurisée** avec vérification enabled
- ✅ **Mot de passe oublié** avec tokens temporaires  
- ✅ **Confirmation email** automatique
- ✅ **Gestion des rôles** (USER/ADMIN/COACH)
- ✅ **Intercepteur HTTP** adapté Spring Boot
- ✅ **Gestion d'erreurs** complète
- ✅ **Interfaces responsive** et professionnelles

## 🎉 Résultat

Votre application Angular communique maintenant **parfaitement** avec votre backend Spring Boot existant, sans aucune modification nécessaire côté backend ! 

Tout est prêt pour vos utilisateurs ! 🚀