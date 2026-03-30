import { Component,OnInit  } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Data } from '../data';
@Component({
  selector: 'app-recipe-card',
  imports: [RouterLink],
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
}




