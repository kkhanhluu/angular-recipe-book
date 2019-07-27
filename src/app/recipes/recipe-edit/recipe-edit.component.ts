import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';

import { RecipesService } from '../recipes.service';
import * as fromApp from 'src/app/sotre/app.reducer';
import { map } from 'rxjs/operators';
import * as RecipesAction from '../store/recipe.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  form: FormGroup;

  private storeSubs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipeById(this.id);
      this.storeSubs = this.store
        .select('recipes')
        .pipe(map(recipesState => recipesState.recipes[this.id]))
        .subscribe(recipe => {
          recipeName = recipe.name;
          recipeImgPath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe.ingredients) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[0-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        });
    }

    this.form = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImgPath, Validators.required),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients
    });
  }

  get controls() {
    return (this.form.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.form.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[0-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.form.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new RecipesAction.UpdateRecipe({
          index: this.id,
          recipe: this.form.value
        })
      );
    } else {
      this.store.dispatch(new RecipesAction.AddRecipes(this.form.value));
    }
    this.router.navigate(['/recipes']);
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy(): void {
    if (this.storeSubs) {
      this.storeSubs.unsubscribe();
    }
  }
}
