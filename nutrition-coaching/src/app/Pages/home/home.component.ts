import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, NutritionService, UserService } from '../../services';
import { User, NutritionPlan } from '../../models';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;
  recentNutritionPlans: NutritionPlan[] = [];
  isLoading = false;
  nutritionStats: any = null;

  constructor(
    private authService: AuthService,
    private nutritionService: NutritionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // S'abonner aux changements d'utilisateur
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadUserData();
      }
    });
  }

  private loadUserData(): void {
    this.isLoading = true;
    
    // Charger les plans nutritionnels récents
    this.nutritionService.getNutritionPlans({ page: 1, limit: 3 }).subscribe({
      next: (response) => {
        this.recentNutritionPlans = response.data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des plans:', error);
      }
    });

    // Charger les statistiques nutritionnelles
    this.nutritionService.getNutritionStats('week').subscribe({
      next: (stats) => {
        this.nutritionStats = stats;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des statistiques:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
