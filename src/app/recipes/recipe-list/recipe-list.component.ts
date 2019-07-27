import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import * as fromApp from '../../sotre/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  recipes: Recipe[];

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
    this.subscription = this.store
      .select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  ngOnInit() {}

  navigateToNewRecipe() {
    this.router.navigate(['/recipes', 'new']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
