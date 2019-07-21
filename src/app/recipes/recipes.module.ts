import { NgModule } from '@angular/core'; 
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeComponent } from './recipe-list/recipe/recipe.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component'; 
import { RecipesRoutingModule } from './recipes-routing.module'; 

@NgModule({
  imports: [
    RouterModule, 
    CommonModule, 
    ReactiveFormsModule, 
    RecipesRoutingModule
  ], 
  declarations: [
    RecipesComponent, 
    RecipeListComponent, 
    RecipeDetailComponent, 
    RecipeComponent,  
    RecipeStartComponent, 
    RecipeEditComponent, 
  ]
})
export class RecipesModule {}