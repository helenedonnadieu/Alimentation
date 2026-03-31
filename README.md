**My Recipes — Angular App**
An Angular cooking recipe application powered by the Spoonacular API.

**Features**

Real-time recipe search using Observables (valueChanges).
Advanced filters: diet, prep time, budget, popularity, and ingredients.
Recipe Cards: image, badges, health score, and price per serving.
Recipe Details: full list of ingredients and preparation steps.
Navigation with Angular Router.
Responsive design powered by Bootstrap 5.

| Recipe Card | Recipe Details |
| :---: | :---: |
| <img src="Screenshots/recipe-card.png" alt="Individual Recipe Card" width="300px"> | <img src="Screenshots/recipe-detail.png" alt="Full Recipe Details View" width="300px"> |


**Project structure**

src/
├── app/
│   ├── header/              # Navigation bar
│   ├── footer/              # Footer
│   ├── body/                # Main container component
│   ├── recipe-list/         # Recipe list + filter logic
│   ├── recipe-card/         # Individual recipe card
│   ├── recipe-details/      # Full recipe details view
│   ├── data.ts              # Spoonacular API service
│   ├── app.routes.ts        # Route configuration
│   └── app.config.ts        # Angular configuration
├── styles.css               # Global styles
└── index.html

**Installation**
# Clone the project
git clone https://github.com/YOUR-USERNAME/alimentation.git
cd alimentation
# Install dependencies
npm install
# Start the development server
ng serve

Open http://localhost:4200 in your browser.

**Spoonacular API**
Documentation: https://spoonacular.com/food-api

**Authors**
Aminata Yade
Hélène Donnadieu
