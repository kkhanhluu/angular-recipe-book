import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';

export class SetRecipes implements Action {
  readonly type: string = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type: string = FETCH_RECIPES;
  constructor(public payload: any = null) {}
}

export class AddRecipes implements Action {
  readonly type: string = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type: string = UPDATE_RECIPE;
  constructor(public payload: { index: number; recipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type: string = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export type RecipesActions =
  | SetRecipes
  | FetchRecipes
  | AddRecipes
  | UpdateRecipe
  | DeleteRecipe;
