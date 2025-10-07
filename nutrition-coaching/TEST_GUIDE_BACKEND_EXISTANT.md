# 🧪 Guide de Test - Backend Spring Boot Existant

## 📋 Votre Structure Backend

Basé sur votre code, voici la structure de votre backend Spring Boot :

### Entité User
```java
@Entity
@Table(name = "utilisateurs")
public class User {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private Role role; // ENUM
    private boolean enabled; // Confirmation email
}
```

### Endpoints disponibles
- `POST /api/users/register` - Inscription
- `POST /api/users/login` - Connexion
- `GET /api/users/confirm?token=` - Confirmation email
- `POST /api/users/forgot-password?email=` - Mot de passe oublié
- `POST /api/users/reset-password?token=&nouveauMotDePasse=` - Réinitialisation

## ✅ Adaptations Frontend Effectuées

### 1. Modèle User adapté
```typescript
export interface User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse?: string;
  role: 'USER' | 'ADMIN' | 'COACH';
  enabled: boolean;
}
```

### 2. Service Auth adapté
- ✅ Login avec `email` et `motDePasse`
- ✅ Register avec `nom`, `prenom`, `email`, `motDePasse`
- ✅ Forgot password avec paramètre `email`
- ✅ Reset password avec `token` et `nouveauMotDePasse`
- ✅ Confirm email avec `token`

### 3. Composants créés
- ✅ LoginComponent - Connexion
- ✅ RegisterComponent - Inscription
- ✅ ForgotPasswordComponent - Mot de passe oublié

## 🚀 Test de l'Intégration

### 1. Démarrer votre backend Spring Boot
```bash
cd C:\Users\ademz\OneDrive\Documents\GitHub\Projet_IA_5SAE4\application_nutrition
mvn spring-boot:run
```

### 2. Démarrer le frontend Angular
```bash
cd C:\Users\ademz\OneDrive\Documents\GitHub\Projet_IA_-Front-5SAE4\nutrition-coaching
ng serve
```

### 3. URLs de test
- **Login** : `http://localhost:4200/login`
- **Register** : `http://localhost:4200/register`
- **Forgot Password** : `http://localhost:4200/forgot-password`

## 🧪 Scénarios de Test

### Test 1: Inscription
1. Aller sur `http://localhost:4200/register`
2. Remplir le formulaire :
   - Nom : `Dupont`
   - Prénom : `Jean`
   - Email : `jean.dupont@test.com`
   - Mot de passe : `password123`
3. Cliquer sur "S'inscrire"
4. ✅ **Attendu** : Message de succès et redirection vers login

### Test 2: Connexion
1. Aller sur `http://localhost:4200/login`
2. Utiliser les identifiants créés précédemment
3. Cliquer sur "Se connecter"
4. ✅ **Attendu** : Connexion réussie (si email confirmé)

### Test 3: Mot de passe oublié
1. Aller sur `http://localhost:4200/forgot-password`
2. Entrer un email existant
3. Cliquer sur "Envoyer le lien"
4. ✅ **Attendu** : Message "Email de réinitialisation envoyé !"

## 🔍 Vérifications Backend

### Console Spring Boot
Surveillez les logs de votre application Spring Boot pour voir :
- Les requêtes HTTP reçues
- Les erreurs éventuelles
- Les confirmations d'inscription

### Base de données MySQL
Vérifiez dans votre base `Projet_IA` :
```sql
SELECT * FROM utilisateurs;
```

## 🐛 Résolution de Problèmes

### Erreur CORS
Si vous avez des erreurs CORS, ajoutez cette configuration dans Spring Boot :

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

### Erreur 404
- Vérifiez que votre backend tourne sur le port 8080
- Vérifiez que les endpoints correspondent : `/api/users/login`, `/api/users/register`, etc.

### Problème de confirmation email
Si `enabled = false` après inscription :
- L'utilisateur doit cliquer sur le lien de confirmation envoyé par email
- Pour tester, vous pouvez temporairement désactiver cette vérification

## 📝 Prochaines Étapes

### 1. Ajouter les routes Angular
Dans `app.routes.ts` :
```typescript
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  // ... autres routes
];
```

### 2. Améliorer la gestion des rôles
Adapter la redirection après login selon le rôle :
- `USER` → Dashboard utilisateur
- `ADMIN` → Panel admin
- `COACH` → Interface coach

### 3. Ajouter la gestion du profil utilisateur
Créer des endpoints pour :
- Modifier le profil
- Changer le mot de passe (connecté)
- Upload d'avatar

## 🎯 Points d'Attention

1. **Sécurité** : Les mots de passe doivent être hashés côté backend
2. **Validation** : Vérifier les données côté backend également
3. **Email** : Configuration SMTP pour l'envoi d'emails
4. **Tokens** : Gérer l'expiration des tokens de confirmation/reset

Votre intégration est maintenant prête à fonctionner avec votre backend Spring Boot existant ! 🚀