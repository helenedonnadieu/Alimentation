import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipe-details',
  imports: [CommonModule],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.css',
})

export class RecipeDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  recipe = signal<any | null>(null);
  ingredients = signal<any[]>([]);
  steps = signal<any[]>([]);
  currentStepIndex = signal(0);
  stepCount = computed(() => this.steps().length);
  currentStep = computed(() => this.steps()[this.currentStepIndex()] ?? null);
  progress = computed(() => {
    const total = this.stepCount();
    if (!total) {
      return 0;
    }

    return ((this.currentStepIndex() + 1) / total) * 100;
  });
  canGoPrevious = computed(() => this.currentStepIndex() > 0);
  canGoNext = computed(() => this.currentStepIndex() < this.stepCount() - 1);

  private apiKey = '0f0185dbc36b48638ef048d3cb6fba64';

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get('id');

        if (!id) {
          this.recipe.set(null);
          this.ingredients.set([]);
          this.steps.set([]);
          this.currentStepIndex.set(0);
          return;
        }

        this.http.get<any>(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}&includeNutrition=false`
        ).subscribe({
          next: (data) => {
            this.recipe.set({
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
            });
            this.ingredients.set(data.extendedIngredients || []);
            this.steps.set(data.analyzedInstructions?.[0]?.steps || []);
            this.currentStepIndex.set(0);
          },
          error: (err) => console.error('Erreur API :', err)
        });
      },
      );
  }

  previousStep(): void {
    if (this.canGoPrevious()) {
      this.currentStepIndex.update((index) => index - 1);
    }
  }

  nextStep(): void {
    if (this.canGoNext()) {
      this.currentStepIndex.update((index) => index + 1);
    }
  }

  selectStep(stepIndex: number): void {
    if (stepIndex >= 0 && stepIndex < this.stepCount()) {
      this.currentStepIndex.set(stepIndex);
    }
  }
}
