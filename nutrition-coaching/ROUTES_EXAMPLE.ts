import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/auth/login/login.component';
import { RegisterComponent } from './Pages/auth/register/register.component';
import { ForgotPasswordComponent } from './Pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Pages/auth/reset-password/reset-password.component';
import { ConfirmEmailComponent } from './Pages/auth/confirm-email/confirm-email.component';
import { BackendTestComponent } from './Pages/test/backend-test.component';

export const routes: Routes = [
  // Page d'accueil
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  
  // Routes d'authentification
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  
  // Route de test backend
  { path: 'test-backend', component: BackendTestComponent },
  
  // Routes protégées (à ajouter plus tard avec des guards)
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  
  // Redirection par défaut
  { path: '**', redirectTo: '' }
];

/*
Instructions pour utiliser ces routes :

1. Ces routes sont déjà configurées pour vos composants d'authentification
2. Pour tester les composants, utilisez ces URLs :
   - http://localhost:4200/login
   - http://localhost:4200/register  
   - http://localhost:4200/forgot-password
   - http://localhost:4200/test-backend

3. Les routes de réinitialisation et confirmation fonctionnent avec des paramètres :
   - http://localhost:4200/reset-password?token=ABC123
   - http://localhost:4200/confirm-email?token=DEF456

4. Pour ajouter des guards d'authentification plus tard :
   - Créez un AuthGuard
   - Ajoutez canActivate: [AuthGuard] aux routes protégées

5. Vous pouvez ajouter des routes supplémentaires selon vos besoins :
   - Dashboard utilisateur
   - Panel admin (selon le rôle)
   - Pages de profil
   - etc.
*/