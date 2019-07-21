import {Component, Output, OnInit, OnDestroy } from '@angular/core'; 

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service'; 
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header', 
  templateUrl: 'header.component.html', 
  styleUrls: ['header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription; 
  isAuthenticated: boolean = false; 

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
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
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}