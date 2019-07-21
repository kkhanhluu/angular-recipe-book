import { Injectable } from '@angular/core'; 
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service'; 
import { RecipesService } from './recipes.service'; 

@Injectable({providedIn: 'root'}) 
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recipesService: RecipesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes(); 
    if (recipes.length === 0)
      return this.dataStorageService.fetchRecipes(); 
    else 
      return recipes; 
  }
}