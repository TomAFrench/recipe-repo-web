import axios from 'axios';

class RecipeAPIWrapper {

  constructor() {
    this.API_URL = process.env.REACT_APP_API_URL;
  }

  async getRecipes() {
    return axios.get(this.API_URL + '/recipes');
  }

  async getRecipe(recipe_id) {
    return axios.get(this.API_URL + '/recipes/' + recipe_id);
  }

  async saveNewRecipe(recipe, image){
    let data = new FormData();
    Object.keys(recipe).forEach(key => data.append(key, recipe[key]));
    data.set("ingredients", JSON.stringify(Object.values(recipe.ingredients)));
    data.append('image', image);

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
     };

    return axios.post(this.API_URL + '/recipes', data, config)
  }
}

var repoAPI = new RecipeAPIWrapper();

export default repoAPI;