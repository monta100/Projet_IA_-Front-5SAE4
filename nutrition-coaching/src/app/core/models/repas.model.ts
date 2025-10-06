import { TypeRepas } from './type-repas.enum';
import { User } from './user.model';
import { Recette } from './recette.model';
import { Ingredient } from './ingredient.model';

export class Repas {
  constructor(
    public type: TypeRepas,
    public date: string,
    public nom?: string, // Ajout du nom
    public caloriesTotales?: number,
    public id?: number,
    public user?: User,
    public recettes?: Recette[],
    public ingredients?: Ingredient[], // Ajout des ingrédients
  ) {}

  static fromPlain(obj: Partial<Repas>): Repas {
    return new Repas(
      obj.type ?? TypeRepas.DEJEUNER,
      obj.date ?? new Date().toISOString().substring(0,10),
      obj.nom, // Ajout du nom
      obj.caloriesTotales,
      obj.id,
      obj.user,
      obj.recettes,
      obj.ingredients // Ajout des ingrédients
    );
  }
}
