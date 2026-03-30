import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private httpClient = inject(HttpClient);
  //private apiKey = '8c4b46ef1742496783a6f7dde1fb54dc';
  private apiKey = '0f0185dbc36b48638ef048d3cb6fba64';
  // Tableau pour stocker vos recettes
  public recipes: Array<any> = [];

  constructor() {
    // Appel vers Spoonacular (Exemple : 10 recettes complexes)
    this.httpClient
      .get<any>(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.apiKey}&number=10&addRecipeInformation=true`)
      .subscribe({
        next: (value: any) => {
          // Spoonacular renvoie les résultats dans un tableau nommé 'results'
          const newArray = value.results.map((el: any) => {
            return {
              id: el.id,
              name: el.title,
              description: el.summary?.replace(/<[^>]*>/g, '').slice(0, 10000) + '...', // Nettoyage du HTML
              img: el.image,
              time: el.readyInMinutes,
              prepTime: el.preparationMinutes,
              cookTime: el.cookingMinutes,
              servings: el.servings,
              vegetarian: el.vegetarian,
              vegan: el.vegan,
              glutenFree: el.glutenFree,
              dairyFree: el.dairyFree,
              veryHealthy: el.veryHealthy,
              veryPopular: el.veryPopular,
              healthScore: el.healthScore,
              price: (el.pricePerServing / 100).toFixed(2),
              likes: el.aggregateLikes,
              dishTypes: el.dishTypes,
              diets: el.diets,
              occasions: el.occasions,
              sourceUrl: el.sourceUrl,
            };
          });
          
          this.recipes = newArray;
          console.log('Recettes chargées :', this.recipes);
        },
        error: (err) => console.error('Erreur API :', err)
      });
  }
}