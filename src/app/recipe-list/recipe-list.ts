import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Data } from '../data';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
//export class RecipeList {
  //public dataService = inject(Data);
//}

export class RecipeList {
  favoritesOnly = false;
  searchControl = new FormControl('');
  searchQuery$ = this.searchControl.valueChanges;
  filterVegetarian = false;
  filterVegan = false;
  filterGlutenFree = false;
  filterDairyFree = false;
  filterTime = 'all';
  filterHealthy = false;
  filterCheap = false;
  filterPopular = false;
  ingredientQuery = '';

  constructor(public dataService: Data, private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.favoritesOnly = !!data['favoritesOnly'];
    });
  }

  get recipesSource() {
    return this.favoritesOnly
      ? this.dataService.favoriteRecipes
      : this.dataService.recipes;
  }

  get filteredRecipes() {
    const query = (this.searchControl.value ?? '').toString().toLowerCase();
    return this.recipesSource.filter(r => {
      if (query && !r.name.toLowerCase().includes(query)) return false;
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

  isFavorite(recipeId: number): boolean {
    return this.dataService.isFavorite(recipeId);
  }

  toggleFavorite(recipeId: number): void {
    this.dataService.toggleFavorite(recipeId);
  }

  resetFilters() {
    this.searchControl.setValue('');
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