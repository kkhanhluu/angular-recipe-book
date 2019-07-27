import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../sotre/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecpiesActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    // private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !(user == null);
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.store.dispatch(new RecpiesActions.FetchRecipes());
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }
}
