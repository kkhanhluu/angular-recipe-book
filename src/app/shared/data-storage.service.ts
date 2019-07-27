import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../sotre/app.reducer';
import * as RecipesAction from '../recipes/store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private URL = 'https://angular-course-recipe-bo-caff9.firebaseio.com';

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    return this.http
      .put(this.URL + '/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    this.store.dispatch(new RecipesAction.FetchRecipes());
  }
}
