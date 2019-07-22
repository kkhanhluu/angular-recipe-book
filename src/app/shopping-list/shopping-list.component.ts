import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from './shopping-list.service'; 
import { Ingredient } from '../shared/ingredient.model'; 

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'], 
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[]; 
  private ingredientsChangeSub: Subscription; 
  
  constructor(private shoppingListService: ShoppingListService) {
    this.ingredients = this.shoppingListService.getIngredients(); 
    this.ingredientsChangeSub = this.shoppingListService.ingredientsList.subscribe((data: Ingredient[]) => this.ingredients = data);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ingredientsChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index); 
  }
}