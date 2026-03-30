
import { Routes } from '@angular/router';
import { Body } from './body/body';
import { RecipeList } from './recipe-list/recipe-list';

export const routes: Routes = [
  { 
    path: '', 
    component: Body, 
    children: [
      { path: '', component: RecipeList } // Affiche la liste à l'intérieur du Body
    ]
  }
];