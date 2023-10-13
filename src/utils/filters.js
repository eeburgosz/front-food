export const filterByType = (type, recipes) => {
   if (type) {
      return recipes.filter(recipe => recipe.Types.some(t => t.name === type));
   } else {
      return recipes;
   }
};


export const sortingRecipes = (score, sort, recipes) => {
   const recipesCopy = [...recipes];
   if (score !== null) {
      score === "min-max" ?
         recipesCopy.sort((a, b) => {
            if (a.score > b.score) return 1;
            if (b.score > a.score) return -1;
            return 0;
         }) :
         recipesCopy.sort((a, b) => {
            if (a.score > b.score) return -1;
            if (b.score > a.score) return 1;
            return 0;
         });
   } else if (sort) {
      if (sort === 'A-Z') {
         return recipesCopy.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === 'Z-A') {
         return recipesCopy.sort((a, b) => b.name.localeCompare(a.name));
      }
   }
   return recipesCopy;
};