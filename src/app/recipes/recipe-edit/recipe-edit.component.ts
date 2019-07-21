import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'; 

import { RecipesService } from '../recipes.service'; 
import { Recipe } from '../recipe.model'; 

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number; 
  editMode: boolean = false; 
  form: FormGroup; 

  constructor(private route: ActivatedRoute, private recipeService: RecipesService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null; 
      this.initForm(); 
    }); 
  }

  private initForm() {
    let recipeName = ''; 
    let recipeImgPath = ''; 
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]); 

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id); 
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath; 
      recipeDescription = recipe.description; 
      if (recipe.ingredients) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required), 
            'amount': new FormControl(ingredient.amount, [
              Validators.required, 
              Validators.pattern(/^[0-9]+[0-9]*$/)
            ])
          })); 
        }
      }
    }

    this.form = new FormGroup({
      'name': new FormControl(recipeName, Validators.required), 
      'imagePath': new FormControl(recipeImgPath, Validators.required), 
      'description': new FormControl(recipeDescription), 
      'ingredients': recipeIngredients
    });
  }

  get controls() {
    return (<FormArray>this.form.get('ingredients')).controls; 
  }

  onAddIngredient() {
    (<FormArray>this.form.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required), 
      'amount': new FormControl(null, [
        Validators.required, 
        Validators.pattern(/^[0-9]+[0-9]*$/)
      ])
    }))
  }

  onDeleteIngredient(index: number) {
    (this.form.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.form.value); 
    }
    else {
      this.recipeService.addRecipe(this.form.value);
    }
    this.router.navigate(['/recipes']); 
  }

  onCancel() {
    this.router.navigate(['/recipes']); 
  }
}