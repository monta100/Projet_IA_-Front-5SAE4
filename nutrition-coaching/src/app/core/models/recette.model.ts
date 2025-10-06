import { Ingredient } from './ingredient.model';
import { Repas } from './repas.model';

export class Recette {
  constructor(
    public nom: string,
    public description?: string,
    public calories?: number,
    public id?: number,
    public repas?: Repas,
    public ingredients?: Ingredient[],
  ) {}

  static fromPlain(obj: Partial<Recette>): Recette {
    return new Recette(
      obj.nom ?? '',
      obj.description,
      obj.calories,
      obj.id,
      obj.repas,
      obj.ingredients
    );
  }
}
