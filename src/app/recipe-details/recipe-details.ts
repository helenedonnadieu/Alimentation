import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe-details',
  imports: [CommonModule],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.css',
})
export class RecipeDetails implements OnInit {
  recipe: any;
  ingredients: any[] = [];
  steps: any[] = [];
  //private apiKey = '6891b90d059f49b8b18c3d3800b9cba7';
    private apiKey = '8c4b46ef1742496783a6f7dde1fb54dc';


  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http
      .get<any>(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}&includeNutrition=false`
      )
      .subscribe({
        next: (data) => {
          this.recipe = {
            id: data.id,
            name: data.title,
            img: data.image,
            time: data.readyInMinutes,
            prepTime: data.preparationMinutes,
            cookTime: data.cookingMinutes,
            servings: data.servings,
            vegetarian: data.vegetarian,
            vegan: data.vegan,
            glutenFree: data.glutenFree,
            dairyFree: data.dairyFree,
            veryHealthy: data.veryHealthy,
            veryPopular: data.veryPopular,
            healthScore: data.healthScore,
            price: (data.pricePerServing / 100).toFixed(2),
            likes: data.aggregateLikes,
            dishTypes: data.dishTypes,
            occasions: data.occasions,
            sourceUrl: data.sourceUrl,
          };

          this.ingredients = data.extendedIngredients || [];
          this.steps = data.analyzedInstructions?.[0]?.steps || [];
        },
        error: (err) => console.error('Erreur API :', err),
      });
  }
}
