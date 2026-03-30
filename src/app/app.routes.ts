
import { Routes } from '@angular/router';
import { Body } from './body/body';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeCard } from './recipe-card/recipe-card';
import { RecipeDetails } from './recipe-details/recipe-details';
export const routes: Routes = [
  { 
    path: '', 
    component: Body, 
    children: [
      { path: '', component: RecipeList },
      { path: 'recipes', component: RecipeList },
      { path: 'favorites', component: RecipeList, data: { favoritesOnly: true } },

      { path: 'recipes/:id', component: RecipeCard }, 
      { path: 'details/:id', component: RecipeDetails },
    ]
  }
];