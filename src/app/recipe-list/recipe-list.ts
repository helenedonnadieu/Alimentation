import { Component, inject } from '@angular/core';
import { Data } from '../data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
//export class RecipeList {
  //public dataService = inject(Data);
//}

export class RecipeList {
  searchQuery = '';
  filterVegetarian = false;
  filterVegan = false;
  filterGlutenFree = false;
  filterDairyFree = false;
  filterTime = 'all';
  filterHealthy = false;
  filterCheap = false;
  filterPopular = false;
  ingredientQuery = '';

  constructor(public dataService: Data) {}

  get filteredRecipes() {
    return this.dataService.recipes.filter(r => {
      if (this.searchQuery && !r.name.toLowerCase().includes(this.searchQuery.toLowerCase())) return false;
      if (this.filterVegan && !r.vegan) return false;
      if (this.filterVegetarian && !r.vegetarian) return false;
      if (this.filterGlutenFree && !r.glutenFree) return false;
      if (this.filterDairyFree && !r.dairyFree) return false;
      if (this.filterTime === '-30' && r.time >= 30) return false;
      if (this.filterTime === '30-60' && (r.time < 30 || r.time > 60)) return false;
      if (this.filterTime === '+60' && r.time <= 60) return false;
      if (this.filterHealthy && r.healthScore < 50) return false;
      if (this.filterCheap && r.price > 3) return false;
      if (this.filterPopular && !r.veryPopular) return false;
      if (this.ingredientQuery) {
        const hasIngredient = r.ingredients?.some((ing: any) =>
          ing.name.toLowerCase().includes(this.ingredientQuery.toLowerCase())
        );
        if (!hasIngredient) return false;
      }
      return true;
    });
  }

  resetFilters() {
    this.searchQuery = '';
    this.filterVegetarian = false;
    this.filterVegan = false;
    this.filterGlutenFree = false;
    this.filterDairyFree = false;
    this.filterTime = 'all';
    this.filterHealthy = false;
    this.filterCheap = false;
    this.filterPopular = false;
    this.ingredientQuery = '';
  }
}