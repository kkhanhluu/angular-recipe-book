import { Subject } from 'rxjs'; 

import { Recipe } from './recipe.model'; 
import { Ingredient } from '../shared/ingredient.model'; 
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>(); 

  // private recipes: Recipe[] = [
  //   new Recipe('A test recipe', 
  //              'this is simply a test', 
  //              'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/nachos_92445_16x9.jpg', 
  //             [
  //               new Ingredient('Meat', 1), 
  //               new Ingredient('French Fries', 20)
  //             ]), 
  //   new Recipe('Another test recipe', 
  //              'this is the second test',      'https://shewearsmanyhats.com/wp-content/uploads/2015/10/garlic-shrimp-recipe-1b-480x270.jpg', 
  //              [
  //                new Ingredient('Buns', 2),   
  //                new Ingredient('Meat', 1)
  //              ])
  // ]; 
  private recipes: Recipe[] = [];
  
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice(); 
  }

  getRecipeById(id: number): Recipe {
    return this.recipes.slice()[id]; 
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe); 
    this.recipesChanged.next(this.recipes.slice()); 
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe; 
    this.recipesChanged.next(this.recipes.slice()); 
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1); 
    this.recipesChanged.next(this.recipes.slice());
  }
}