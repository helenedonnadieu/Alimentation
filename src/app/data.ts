import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private httpClient = inject(HttpClient);
  //private apiKey = '8c4b46ef1742496783a6f7dde1fb54dc';
  private apiKey = '6891b90d059f49b8b18c3d3800b9cba7';
  private favoritesStorageKey = 'favoriteRecipeIds';
  private favoriteIds = signal<number[]>(this.loadFavoriteIds());
  // Tableau pour stocker vos recettes
  public recipes: Array<any> = [];

  get favoriteRecipes(): Array<any> {
    const ids = new Set(this.favoriteIds());
    return this.recipes.filter((recipe) => ids.has(recipe.id));
  }

  isFavorite(recipeId: number): boolean {
    return this.favoriteIds().includes(recipeId);
  }

  toggleFavorite(recipeId: number): void {
    const ids = this.favoriteIds();
    const isAlreadyFavorite = ids.includes(recipeId);

    const nextIds = isAlreadyFavorite
      ? ids.filter((id) => id !== recipeId)
      : [...ids, recipeId];

    this.favoriteIds.set(nextIds);
    this.saveFavoriteIds(nextIds);
  }

  private loadFavoriteIds(): number[] {
    try {
      const stored = localStorage.getItem(this.favoritesStorageKey);
      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);
      return Array.isArray(parsed)
        ? parsed.filter((id) => typeof id === 'number')
        : [];
    } catch {
      return [];
    }
  }

  private saveFavoriteIds(ids: number[]): void {
    try {
      localStorage.setItem(this.favoritesStorageKey, JSON.stringify(ids));
    } catch {
      // Ignore localStorage errors to keep the app usable.
    }
  }

  constructor() {
    // Appel vers Spoonacular (Exemple : 10 recettes complexes)
    this.httpClient
      .get<any>(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.apiKey}&number=10&addRecipeInformation=true`)
      .subscribe({
        next: (value: any) => {
          // Spoonacular renvoie les résultats dans un tableau nommé 'results'
          const newArray = value.results.map((el: any) => {
            const instructionSteps =
              el.analyzedInstructions?.[0]?.steps?.map((step: any) => step.step) ?? [];

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
              ingredients: el.extendedIngredients ?? [],
              instructionSteps,
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