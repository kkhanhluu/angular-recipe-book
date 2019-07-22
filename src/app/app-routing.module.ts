import { NgModule } from '@angular/core'; 
import { Route, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthComponent } from './auth/auth.component';

const appRoutes: Route[] = [ 
  { path: '', redirectTo: '/recipes', pathMatch: 'full'}, 
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'}, 
  { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})], 
  exports: [RouterModule]
})
export class AppRoutingModule {}