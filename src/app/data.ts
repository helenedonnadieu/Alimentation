import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private httpClient = inject(HttpClient);
  private apiKey = '8c4b46ef1742496783a6f7dde1fb54dc';
  
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
              //description: el.summary?.replace(/<[^>]*>/g, '').slice(0, 150) + '...', // Nettoyage du HTML
              img: el.image,
              time: el.readyInMinutes // Exemple de donnée supplémentaire
            };
          });
          
          this.recipes = newArray;
          console.log('Recettes chargées :', this.recipes);
        },
        error: (err) => console.error('Erreur API :', err)
      });
  }
}