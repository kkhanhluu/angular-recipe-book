import { NgModule } from '@angular/core'; 
import { Route, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component'; 
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component'; 
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component'; 
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component'; 
import { RecipeResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard'; 

const appRoutes: Route[] = [
  { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard],children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent }, 
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] }, 
    { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] }, 
  ] }, 
  { path: 'shopping-list', component: ShoppingListComponent }, 
  { path: 'auth', component: AuthComponent},
  { path: '', redirectTo: '/recipes', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], 
  exports: [RouterModule]
})
export class AppRoutingModule {

}