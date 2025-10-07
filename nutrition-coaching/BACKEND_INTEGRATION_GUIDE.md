# Guide de Configuration Backend pour Nutrition Coaching

## Configuration requise dans environment.ts

Modifiez le fichier `src/environments/environment.ts` avec les informations de votre backend :

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:VOTRE_PORT/api', // Remplacez VOTRE_PORT par le port de votre backend
  appName: 'Nutrition Coaching',
  version: '1.0.0'
};
```

## Endpoints attendus par le frontend

Le frontend Angular s'attend à recevoir les endpoints suivants de votre backend :

### Authentification
- `POST /api/auth/login` - Connexion utilisateur
- `POST /api/auth/register` - Inscription utilisateur
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/me` - Obtenir l'utilisateur connecté
- `POST /api/auth/refresh` - Rafraîchir le token

### Utilisateurs
- `GET /api/users/profile` - Profil utilisateur
- `PUT /api/users/profile` - Mettre à jour le profil
- `POST /api/users/change-password` - Changer mot de passe
- `POST /api/users/avatar` - Upload avatar

### Nutrition
- `GET /api/nutrition/plans` - Liste des plans nutritionnels
- `POST /api/nutrition/plans` - Créer un plan
- `GET /api/nutrition/plans/:id` - Détails d'un plan
- `PUT /api/nutrition/plans/:id` - Modifier un plan
- `DELETE /api/nutrition/plans/:id` - Supprimer un plan
- `GET /api/nutrition/tracker` - Suivi nutritionnel
- `POST /api/nutrition/tracker` - Mettre à jour le suivi
- `GET /api/nutrition/foods/search` - Rechercher des aliments
- `GET /api/nutrition/stats` - Statistiques nutritionnelles

## Format des réponses API

Toutes les réponses de votre backend doivent suivre ce format :

### Réponse standard
```json
{
  "success": true,
  "data": { /* vos données */ },
  "message": "Message optionnel"
}
```

### Réponse d'authentification
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "username": "username",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt_token_here",
    "expiresIn": 3600
  }
}
```

### Réponse paginée
```json
{
  "data": [/* tableau de données */],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### Réponse d'erreur
```json
{
  "success": false,
  "message": "Message d'erreur",
  "errors": ["Détails de l'erreur"]
}
```

## Configuration CORS

Assurez-vous que votre backend autorise les requêtes depuis votre frontend Angular :

```javascript
// Exemple pour Express.js
app.use(cors({
  origin: 'http://localhost:4200', // URL de votre app Angular
  credentials: true
}));
```

## Headers d'authentification

Le frontend enverra automatiquement le token JWT dans le header :
```
Authorization: Bearer <token>
```

## Prochaines étapes

1. Configurez l'URL de votre backend dans `environment.ts`
2. Assurez-vous que votre backend implémente les endpoints listés ci-dessus
3. Vérifiez que les formats de réponse correspondent
4. Testez la connexion en lançant votre frontend avec `ng serve`

## Utilisation des services

Exemples d'utilisation dans vos composants :

```typescript
// Connexion
this.authService.login({email: 'user@example.com', password: 'password'})
  .subscribe(response => console.log('Connecté:', response));

// Obtenir les plans nutritionnels
this.nutritionService.getNutritionPlans()
  .subscribe(plans => console.log('Plans:', plans));

// Mettre à jour le profil
this.userService.updateProfile({firstName: 'John'})
  .subscribe(user => console.log('Profil mis à jour:', user));
```