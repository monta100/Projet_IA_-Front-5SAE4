import { Role } from './role.enum';
import { Repas } from './repas.model';

export class User {
  id?: number;
  nom?: string;
  prenom?: string;
  email?: string;
  motDePasse?: string; // on évite d'exposer ce champ sauf lors de création
  role?: Role;
  repas?: Repas[]; // liste des repas de l'utilisateur
}
