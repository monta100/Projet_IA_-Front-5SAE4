import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  isLoading = true;
  isSuccess = false;
  errorMessage = '';
  successMessage = '';
  token = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer le token depuis l'URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.confirmEmail();
      } else {
        this.isLoading = false;
        this.errorMessage = 'Token de confirmation manquant.';
      }
    });
  }

  private confirmEmail(): void {
    this.authService.confirmEmail(this.token).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isSuccess = true;
        this.successMessage = response || 'Email confirmé avec succès !';
        
        // Rediriger vers la page de connexion après 5 secondes
        setTimeout(() => {
          this.router.navigate(['/login'], {
            queryParams: { message: 'Votre email a été confirmé. Vous pouvez maintenant vous connecter.' }
          });
        }, 5000);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.isSuccess = false;
        this.errorMessage = error.userMessage || 'Erreur lors de la confirmation de l\'email';
        console.error('Erreur confirmation email:', error);
      }
    });
  }

  resendConfirmation(): void {
    // Pour implémenter plus tard si nécessaire
    console.log('Renvoyer email de confirmation');
  }
}