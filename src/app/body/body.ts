import { Component } from '@angular/core';
import { RecipeList } from '../recipe-list/recipe-list';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterOutlet], // On garde uniquement RouterOutlet
  template: `<router-outlet></router-outlet>`, // Ou templateUrl si tu as un fichier .html
})
export class Body {
  
}