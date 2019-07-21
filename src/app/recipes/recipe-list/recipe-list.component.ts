import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model'; 
import { RecipesService } from '../recipes.service'; 
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription; 
  recipes: Recipe[]; 

  constructor(private recipesService: RecipesService, private router: Router) { 
    this.subscription = this.recipesService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes
    })
  }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
  }

  navigateToNewRecipe() {
    this.router.navigate(['/recipes', 'new'])
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}