import { Recette } from './recette.model';

export class Ingredient {
  constructor(
    public nom: string,
    public quantite: number,
    public unite: string,
    public calories: number,
    public id?: number,
    public recette?: Recette,
  ) {}

  static fromPlain(obj: Partial<Ingredient>): Ingredient {
    return new Ingredient(
      obj.nom ?? '',
      obj.quantite ?? 0,
      obj.unite ?? '',
      obj.calories ?? 0,
      obj.id,
      obj.recette
    );
  }
}
