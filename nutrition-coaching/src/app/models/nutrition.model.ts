// Modèle de plan nutritionnel
export interface NutritionPlan {
  id: string;
  userId: string;
  name: string;
  description?: string;
  targetCalories: number;
  macros: MacroNutrients;
  meals: Meal[];
  duration: number; // en jours
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Modèle de macronutriments
export interface MacroNutrients {
  proteins: number; // en grammes
  carbohydrates: number; // en grammes
  fats: number; // en grammes
  fiber?: number; // en grammes
}

// Modèle de repas
export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: Food[];
  totalCalories: number;
  macros: MacroNutrients;
  instructions?: string;
}

// Modèle d'aliment
export interface Food {
  id: string;
  name: string;
  calories: number; // par 100g
  macros: MacroNutrients; // par 100g
  quantity: number; // quantité consommée en grammes
  unit?: string;
}

// Modèle de suivi nutritionnel
export interface NutritionTracker {
  id: string;
  userId: string;
  date: Date;
  meals: Meal[];
  totalCalories: number;
  totalMacros: MacroNutrients;
  waterIntake?: number; // en litres
  notes?: string;
}