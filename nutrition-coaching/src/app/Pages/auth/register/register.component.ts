import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegisterRequest } from '../../../models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('motDePasse');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword?.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }
    return null;
  }

  onSubmit(): void {
    console.log('Register form submitted!', {
      formValid: this.registerForm.valid,
      formValue: this.registerForm.value,
      formErrors: this.getFormErrors()
    });
    
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { confirmPassword, ...registerData } = this.registerForm.value;
      const userData: RegisterRequest = {
        ...registerData,
        role: 'Adherent' // Rôle par défaut correspondant à votre enum backend
      };

      console.log('Sending registration data:', userData);

      this.authService.register(userData).subscribe({
        next: (user) => {
          console.log('Inscription réussie:', user);
          this.successMessage = 'Inscription réussie ! Vérifiez votre email pour confirmer votre compte.';
          
          // Rediriger vers la page de connexion après 3 secondes
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Erreur d\'inscription complète:', error);
          
          // Gestion plus détaillée des erreurs
          if (error.status === 0) {
            this.errorMessage = 'Impossible de contacter le serveur. Vérifiez que le backend est démarré.';
          } else if (error.status === 409) {
            this.errorMessage = 'Cet email est déjà utilisé. Veuillez en choisir un autre.';
          } else if (error.status === 400) {
            this.errorMessage = 'Données invalides. Vérifiez vos informations.';
          } else {
            this.errorMessage = error.userMessage || 'Erreur lors de l\'inscription';
          }
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      console.log('Register form is invalid, errors:', this.getFormErrors());
      this.markFormGroupTouched();
    }
  }

  private getFormErrors(): any {
    const formErrors: any = {};
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control && !control.valid && control.touched) {
        formErrors[key] = control.errors;
      }
    });
    return formErrors;
  }

  onTestClick(): void {
    console.log('Test button clicked!');
    alert('Button clicks are working!');
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  get nom() { return this.registerForm.get('nom'); }
  get prenom() { return this.registerForm.get('prenom'); }
  get email() { return this.registerForm.get('email'); }
  get motDePasse() { return this.registerForm.get('motDePasse'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
}