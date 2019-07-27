import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.actions';
import * as fromApp from '../../sotre/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as RecipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipe: Recipe;
  constructor(
    // private shoppingListSerivce: ShoppingListService,
    private activatedRoute: ActivatedRoute,
    private recipesService: RecipesService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.recipe = this.recipesService.getRecipeById(0);
    this.activatedRoute.params
      .pipe(
        map(params => +params.id),
        switchMap(id => {
          return this.store.select('recipes').pipe(
            map(recipesState => {
              this.id = id;
              return recipesState.recipes[id];
            })
          );
        })
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }

  onAddIngredients() {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onDelete() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
  }
}
