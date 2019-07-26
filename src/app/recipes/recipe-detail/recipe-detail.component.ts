import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params } from '@angular/router';

// import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipesService } from '../recipes.service';
import { Store } from '@ngrx/store';
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.actions';
import * as fromApp from '../../sotre/app.reducer';
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
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.recipe = this.recipesService.getRecipeById(this.id);
    });
  }

  onAddIngredients() {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onDelete() {
    this.recipesService.deleteRecipe(this.id);
  }
}
