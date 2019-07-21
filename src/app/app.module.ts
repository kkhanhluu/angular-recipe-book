import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeComponent } from './recipes/recipe-list/recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component'; 
import { DropdownDirective } from './shared/dropdown.directive'; 
import { ShoppingListService } from './shopping-list/shopping-list.service'; 
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component'; 
import { RecipesService } from './recipes/recipes.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule ],
  declarations: [ AppComponent, HeaderComponent, RecipesComponent, RecipeListComponent, RecipeDetailComponent, RecipeComponent, ShoppingListComponent, ShoppingEditComponent, DropdownDirective, RecipeStartComponent, RecipeEditComponent, AuthComponent, LoadingSpinnerComponent, AlertComponent ],
  bootstrap:    [ AppComponent ], 
  providers: [ShoppingListService, RecipesService, AuthInterceptorService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}]
})
export class AppModule { }
