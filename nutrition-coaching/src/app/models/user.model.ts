// Modèle utilisateur correspondant à votre entité Spring Boot
export interface User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse?: string; // Optionnel pour éviter de renvoyer le mot de passe
  role: 'Adherent' | 'Coach'; // Correspondance exacte avec votre enum backend
  enabled: boolean;
}

// Modèle de profil utilisateur étendu
export interface UserProfile extends Omit<User, 'motDePasse'> {
  age?: number;
  height?: number;
  weight?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goals?: string[];
  medicalConditions?: string[];
}

// Modèle de demande de connexion (correspond à votre backend)
export interface LoginRequest {
  email: string;
  motDePasse: string;
}

// Modèle de demande d'inscription (correspond à votre backend)
export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  role?: 'Adherent' | 'Coach'; // Correspondance exacte avec votre enum backend
}

// Modèle de réinitialisation de mot de passe
export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  nouveauMotDePasse: string;
}

// Modèle de confirmation d'email
export interface ConfirmEmailRequest {
  token: string;
}