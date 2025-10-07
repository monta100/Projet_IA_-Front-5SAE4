// Modèle pour le token de réinitialisation de mot de passe
export interface ResetPasswordToken {
  id?: number;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  used: boolean;
  user?: {
    id: number;
    email: string;
  };
}

// Modèle pour le token de confirmation d'email
export interface ConfirmationToken {
  id?: number;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  confirmed: boolean;
  user?: {
    id: number;
    email: string;
  };
}

// Modèle pour les réponses de validation de token
export interface TokenValidationResponse {
  valid: boolean;
  expired: boolean;
  used?: boolean;
  confirmed?: boolean;
  message: string;
}