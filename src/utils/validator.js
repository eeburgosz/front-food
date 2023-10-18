export const validatorName = (name, allRecipes) => {
   const recipe = allRecipes.find(recipe => recipe.name === name);
   if (recipe) return "Recipe already exists";
   if (name.length < 3) return "Name must be at least 4 characters";
};

export const validatorSummary = (summary) => {
   if (summary.length < 3) return "Summary must be at least 4 characters";
};

export const validatorSteps = (steps) => {
   for (let i = 0; i < steps.length; i++) {
      if (steps[i].step.length < 4) return "You should provide at least one step with at least 5 characters";
   }
};