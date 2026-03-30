import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Data } from '../data';
@Component({
  selector: 'app-recipe-details',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.css',
})
export class RecipeDetails { searchQuery: string = '';
  
  recipe: any;

  constructor(public dataService: Data) {}

  ngOnInit() {
    // Par défaut, on affiche la première recette du service Data
    // Plus tard, tu pourras récupérer l'ID via l'URL (ActivatedRoute)
    if (this.dataService.recipes && this.dataService.recipes.length > 0) {
      this.recipe = this.dataService.recipes[0];
    }
  }

  get filteredRecipes() {
    if (!this.searchQuery) return this.dataService.recipes;
    return this.dataService.recipes.filter(r =>
      r.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }}
