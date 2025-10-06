import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Repas } from '../../core/models/repas.model';
import { RepasService } from '../../core/services/repas.service';
import { Ingredient } from '../../core/models/ingredient.model';
import { Recette } from '../../core/models/recette.model';
import { Router } from '@angular/router';
import { TypeRepas } from '../../core/models/type-repas.enum';

@Component({
  selector: 'app-gestion-repas',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './gestion-repas.component.html',
  styleUrls: ['./gestion-repas.component.css']
})
export class GestionRepasComponent implements OnInit {

  tousLesRepas: Repas[] = [];
  repasFiltres: Repas[] = [];
  repasSelectionne: Repas | null = null;
  enSuppression: Set<number> = new Set();
  loading: boolean = false;
  erreurChargement: string | null = null;

  // Critères de filtrage
  filtreNom: string = '';
  filtreDate: string = '';
  filtreType: string = '';

  typeRepasOptions = Object.values(TypeRepas);

  constructor(private repasService: RepasService, private router: Router) { }

  ngOnInit(): void {
    console.log('[GESTION-REPAS] ngOnInit');
    this.chargerRepas();
  }

  chargerRepas(): void {
    console.log('[GESTION-REPAS] chargerRepas() lancement');
    this.loading = true;
    this.erreurChargement = null;
    this.repasService.findAll().subscribe({
      next: (repas: Repas[]) => {
        console.log('[GESTION-REPAS] données reçues', repas);
        this.tousLesRepas = repas;
        this.repasFiltres = repas;
        this.loading = false;
      },
      error: (err) => {
        console.error('[GESTION-REPAS] ERREUR HTTP', err);
        this.erreurChargement = 'Impossible de charger les repas';
        this.loading = false;
      }
    });
  }

  appliquerFiltres(): void {
    let repas = [...this.tousLesRepas];

    // Filtrage par nom
    if (this.filtreNom) {
      repas = repas.filter(r => r.nom?.toLowerCase().includes(this.filtreNom.toLowerCase()));
    }

    // Filtrage par type
    if (this.filtreType) {
      repas = repas.filter(r => r.type === this.filtreType);
    }

    // Filtrage par date
    if (this.filtreDate) {
        repas = repas.filter(r => {
            const repasDate = r.date ? new Date(r.date).toISOString().split('T')[0] : '';
            return repasDate === this.filtreDate;
        });
    }


    this.repasFiltres = repas;
  }

  reinitialiserFiltres(): void {
    this.filtreNom = '';
    this.filtreDate = '';
    this.filtreType = '';
    this.repasFiltres = [...this.tousLesRepas];
  }

  calculerCalories(repas: Repas): number {
    let totalCalories = 0;
    repas.ingredients?.forEach((ing: Ingredient) => totalCalories += ing.calories || 0);
    repas.recettes?.forEach((rec: Recette) => {
        rec.ingredients?.forEach((ing: Ingredient) => totalCalories += ing.calories || 0);
    });
    return totalCalories;
  }

  voirDetails(repas: Repas): void {
    this.repasSelectionne = repas; // Ouvre la modale
  }

  fermerDetails(): void {
    this.repasSelectionne = null;
  }

  modifierRepas(id: number | undefined): void {
    if (id === undefined) return;
    console.log(`Navigation vers la page de modification pour le repas ${id}`);
  }

  supprimerRepas(id: number | undefined): void {
    if (id === undefined) return;
    if (this.enSuppression.has(id)) return; // éviter double clic rapide

    if (confirm('Êtes-vous sûr de vouloir supprimer ce repas ?')) {
      this.enSuppression.add(id);
      this.repasService.delete(id).subscribe({
        next: () => {
          this.enSuppression.delete(id);
          this.chargerRepas();
        },
        error: (err) => {
          this.enSuppression.delete(id);
          console.error('Erreur lors de la suppression du repas:', err);
          alert('La suppression du repas a échoué. Veuillez réessayer plus tard.');
        }
      });
    }
  }

  goToAjouterRepas(): void {
    alert("La page d'ajout de repas sera bientôt disponible sur une autre route !");
  }
}

