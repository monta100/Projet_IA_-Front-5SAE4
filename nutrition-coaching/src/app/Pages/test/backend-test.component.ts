import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendTestService, AuthService } from '../../services';

@Component({
  selector: 'app-backend-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="card">
            <div class="card-header">
              <h3>Test de Connexion Backend Spring Boot</h3>
            </div>
            <div class="card-body">
              
              <!-- Status de connexion -->
              <div class="alert" [ngClass]="{
                'alert-success': connectionStatus === 'success',
                'alert-danger': connectionStatus === 'error',
                'alert-info': connectionStatus === 'testing'
              }">
                <strong>Status:</strong> {{ connectionMessage }}
              </div>

              <!-- Informations de configuration -->
              <div class="mb-4">
                <h5>Configuration:</h5>
                <ul class="list-group">
                  <li class="list-group-item">
                    <strong>URL Backend:</strong> {{ backendUrl }}
                  </li>
                  <li class="list-group-item">
                    <strong>Port attendu:</strong> 8080 (Spring Boot default)
                  </li>
                  <li class="list-group-item">
                    <strong>CORS nécessaire:</strong> http://localhost:4200
                  </li>
                </ul>
              </div>

              <!-- Boutons de test -->
              <div class="row">
                <div class="col-md-6 mb-2">
                  <button 
                    class="btn btn-primary w-100" 
                    (click)="testConnection()"
                    [disabled]="isLoading">
                    <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                    Test Connexion
                  </button>
                </div>
                <div class="col-md-6 mb-2">
                  <button 
                    class="btn btn-secondary w-100" 
                    (click)="testAuthEndpoints()"
                    [disabled]="isLoading">
                    Test Auth Endpoints
                  </button>
                </div>
              </div>

              <!-- Résultats des tests -->
              <div *ngIf="testResults.length > 0" class="mt-4">
                <h5>Résultats des Tests:</h5>
                <div class="list-group">
                  <div 
                    *ngFor="let result of testResults" 
                    class="list-group-item"
                    [ngClass]="{
                      'list-group-item-success': result.success,
                      'list-group-item-danger': !result.success
                    }">
                    <div class="d-flex justify-content-between align-items-center">
                      <span><strong>{{ result.test }}:</strong> {{ result.message }}</span>
                      <span class="badge" [ngClass]="{
                        'bg-success': result.success,
                        'bg-danger': !result.success
                      }">
                        {{ result.success ? 'OK' : 'ERREUR' }}
                      </span>
                    </div>
                    <small class="text-muted" *ngIf="result.details">{{ result.details }}</small>
                  </div>
                </div>
              </div>

              <!-- Instructions -->
              <div class="mt-4">
                <h5>Instructions:</h5>
                <ol>
                  <li>Assurez-vous que votre backend Spring Boot est démarré sur le port 8080</li>
                  <li>Vérifiez que CORS est configuré pour autoriser http://localhost:4200</li>
                  <li>Consultez le guide d'intégration Spring Boot dans le projet</li>
                  <li>Testez les endpoints avec ce composant</li>
                </ol>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .list-group-item-success {
      background-color: #d1edff;
      border-color: #bee5eb;
    }
    .list-group-item-danger {
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }
    .card {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class BackendTestComponent implements OnInit {
  backendUrl: string = '';
  connectionStatus: 'idle' | 'testing' | 'success' | 'error' = 'idle';
  connectionMessage: string = 'Non testé';
  isLoading: boolean = false;
  testResults: Array<{test: string, success: boolean, message: string, details?: string}> = [];

  constructor(
    private backendTestService: BackendTestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.backendUrl = this.backendTestService['apiUrl'];
  }

  testConnection(): void {
    this.isLoading = true;
    this.connectionStatus = 'testing';
    this.connectionMessage = 'Test de connexion en cours...';
    this.testResults = [];

    // Test 1: Connexion de base
    this.backendTestService.testConnection().subscribe({
      next: (response: any) => {
        this.addTestResult('Connexion', true, 'Backend accessible', JSON.stringify(response));
        this.connectionStatus = 'success';
        this.connectionMessage = 'Connexion réussie au backend Spring Boot';
        this.isLoading = false;
      },
      error: (error: any) => {
        this.addTestResult('Connexion', false, 'Impossible de se connecter au backend', 
          `Erreur: ${error.status} - ${error.message || 'Backend non accessible'}`);
        this.connectionStatus = 'error';
        this.connectionMessage = 'Échec de la connexion au backend';
        this.isLoading = false;
      }
    });

    // Test 2: Test CORS
    fetch(this.backendUrl + '/health', {
      method: 'OPTIONS'
    }).then(response => {
      this.addTestResult('CORS', response.ok, 
        response.ok ? 'CORS configuré correctement' : 'Problème de configuration CORS',
        `Status: ${response.status}`);
    }).catch(error => {
      this.addTestResult('CORS', false, 'Erreur CORS', error.message);
    });
  }

  testAuthEndpoints(): void {
    this.isLoading = true;
    
    // Test des endpoints d'authentification
    this.backendTestService.testAuthEndpoints().subscribe({
      next: (response: any) => {
        this.addTestResult('Auth Endpoints', true, 'Endpoints d\'authentification accessibles', 
          JSON.stringify(response));
        this.isLoading = false;
      },
      error: (error: any) => {
        this.addTestResult('Auth Endpoints', false, 'Endpoints d\'authentification non accessibles', 
          `Erreur: ${error.status} - ${error.message}`);
        this.isLoading = false;
      }
    });
  }

  private addTestResult(test: string, success: boolean, message: string, details?: string): void {
    this.testResults.push({ test, success, message, details });
  }
}