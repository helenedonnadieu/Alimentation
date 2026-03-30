import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Data } from '../data';
@Component({
  selector: 'app-recipe-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard implements OnInit {
   recipe: any;

  constructor(private route: ActivatedRoute, private dataService: Data) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipe = this.dataService.recipes.find(r => r.id === id);
  }

  isFavorite(recipeId: number): boolean {
    return this.dataService.isFavorite(recipeId);
  }

  toggleFavorite(recipeId: number): void {
    this.dataService.toggleFavorite(recipeId);
  }
}




