import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive'; 
import { ShoppingListService } from './shopping-list/shopping-list.service'; 
import { AppRoutingModule } from './app-routing.module';
import { RecipesService } from './recipes/recipes.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { RecipesModule } from './recipes/recipes.module'; 
import { ShoppingListModule } from './shopping-list/shopping-list.module'; 

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    AppRoutingModule, 
    ReactiveFormsModule, 
    HttpClientModule, 
    RecipesModule, 
    ShoppingListModule
  ],
  declarations: [ 
    AppComponent,
    HeaderComponent,
    DropdownDirective, 
    AuthComponent, 
    LoadingSpinnerComponent, 
    AlertComponent 
  ],
  bootstrap:    [ AppComponent ], 
  providers: [ShoppingListService, RecipesService, AuthInterceptorService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}]
})
export class AppModule { }
