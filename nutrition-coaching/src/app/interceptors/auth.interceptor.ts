import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Pour votre backend Spring Boot, pas besoin d'ajouter des tokens JWT
    // Les sessions sont gérées automatiquement par le navigateur
    
    // Ajouter les headers par défaut
    let authReq = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
    });

    // Activer les cookies de session pour Spring Boot
    authReq = authReq.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      },
      withCredentials: true // Important pour les sessions Spring Boot
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Utilisateur non authentifié
          this.handleUnauthorized();
        } else if (error.status === 403) {
          // Accès interdit (utilisateur authentifié mais pas autorisé)
          console.error('Accès interdit:', error.message);
          this.router.navigate(['/access-denied']);
        } else if (error.status >= 500) {
          // Erreur serveur
          console.error('Erreur serveur:', error.message);
        }
        
        return throwError(() => error);
      })
    );
  }

  private handleUnauthorized(): void {
    // Pour votre architecture, pas de refresh token
    // Simplement déconnecter et rediriger
    console.log('Session expirée ou utilisateur non authentifié');
    this.authService.logout();
    this.router.navigate(['/login'], { 
      queryParams: { 
        message: 'Votre session a expiré. Veuillez vous reconnecter.' 
      } 
    });
  }
}