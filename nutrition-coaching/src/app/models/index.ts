// Modèle de réponse API générique
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// Modèle de réponse paginée
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Modèle d'erreur API
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

// Modèle de paramètres de pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Export de tous les modèles
export * from './user.model';
export * from './nutrition.model';
export * from './token.model';