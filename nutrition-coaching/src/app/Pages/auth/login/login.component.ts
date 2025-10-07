import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest, User } from '../../../models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    console.log('Form submitted!'); // Log pour déboguer
    console.log('Form valid:', this.loginForm.valid);
    console.log('Form value:', this.loginForm.value);
    
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials: LoginRequest = this.loginForm.value;
      console.log('Sending credentials:', credentials);

      this.authService.login(credentials).subscribe({
        next: (user: User) => {
          console.log('Connexion réussie:', user);
          
          // Redirection simple vers la page d'accueil
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Erreur de connexion complète:', error);
          
          // Gestion plus détaillée des erreurs
          if (error.status === 0) {
            this.errorMessage = 'Impossible de contacter le serveur. Vérifiez que le backend est démarré.';
          } else if (error.status === 401) {
            this.errorMessage = 'Email ou mot de passe incorrect';
          } else if (error.status === 403) {
            this.errorMessage = 'Accès refusé. Veuillez vérifier vos identifiants.';
          } else {
            this.errorMessage = error.userMessage || 'Une erreur s\'est produite lors de la connexion';
          }
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  private redirectUser(user: User): void {
    // Redirection basée sur le rôle (correspondant à votre enum backend)
    switch (user.role) {
      case 'Coach':
        this.router.navigate(['/coach/dashboard']);
        break;
      case 'Adherent':
      default:
        this.router.navigate(['/home']); // Redirection vers la page d'accueil
        break;
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  testClick(): void {
    console.log('Test click fonctionne !');
    alert('Le clic fonctionne ! Le problème peut être ailleurs.');
  }

  get email() { return this.loginForm.get('email'); }
  get motDePasse() { return this.loginForm.get('motDePasse'); }
}