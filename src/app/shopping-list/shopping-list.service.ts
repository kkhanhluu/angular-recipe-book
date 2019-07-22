import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  startedEditing = new Subject<number>();
  ingredientsList = new Subject<Ingredient[]>();

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsList.next(this.ingredients.slice());
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsList.next(this.ingredients.slice());
  }
}
