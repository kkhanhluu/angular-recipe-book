import { NgModule } from '@angular/core'; 
import { Route, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';

const appRoutes: Route[] = [ 
  { path: 'auth', component: AuthComponent},
  { path: '', redirectTo: '/recipes', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], 
  exports: [RouterModule]
})
export class AppRoutingModule {}