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

  formEncodeRecipe(recipe, image){
    let data = new FormData();
    Object.keys(recipe).forEach(key => data.append(key, recipe[key]));
    data.set("ingredients", JSON.stringify(Object.values(recipe.ingredients)));
    data.append('image', image);

    return data
  }

  async saveNewRecipe(recipe, image){
    const encodedRecipe = this.formEncodeRecipe(recipe, image)

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
     };

    return axios.post(this.API_URL + '/recipes', encodedRecipe, config)
  }

  async updateRecipe(recipe, image){
    const encodedRecipe = this.formEncodeRecipe(recipe, image)

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
     };
    
    const recipe_id = recipe._id
    return axios.put(this.API_URL + '/recipes/' + recipe_id, encodedRecipe, config)
  }

  async getRandomRecipes (numberOfRecipes) {
    return axios.get(this.API_URL + '/random/' + numberOfRecipes)
  }
}

var repoAPI = new RecipeAPIWrapper();

export default repoAPI;