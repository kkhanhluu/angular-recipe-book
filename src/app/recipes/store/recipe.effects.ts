import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as RecipesActions from './recipe.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipesEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap((fetchAction: RecipesActions.RecipesActions) => {
      return this.http.get<Recipe[]>(
        'https://angular-course-recipe-bo-caff9.firebaseio.com/recipes.json'
      );
    }),
    map(recipes => {
      return recipes.map(r => {
        return {
          ...r,
          ingredients: r.ingredients ? r.ingredients : []
        };
      });
    }),
    map(recipes => new RecipesActions.SetRecipes(recipes))
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
