/* eslint-env browser */
import axios from 'axios'

class RecipeAPIWrapper {
  constructor () {
    this.API_URL = process.env.REACT_APP_API_URL
  }

  async getRecipes () {
    return axios.get(this.API_URL + '/recipes')
  }

  async getRecipe (recipeID) {
    return axios.get(this.API_URL + '/recipes/' + recipeID)
  }

  async saveNewRecipe (recipe) {
    return axios.post(this.API_URL + '/recipes', recipe)
  }

  async updateRecipe (recipe) {
    return axios.put(this.API_URL + '/recipes/' + recipe._id, recipe)
  }

  async uploadImage (recipeID, image) {
    let imageData = new FormData()
    imageData.set('image', image)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    return axios.post(this.API_URL + '/recipes/' + recipeID + '/images', imageData, config)
  }

  async getRandomRecipes (numberOfRecipes) {
    return axios.get(this.API_URL + '/random/' + numberOfRecipes)
  }

  async deleteRecipe (recipeID) {
    return axios.delete(this.API_URL + '/recipes/' + recipeID)
  }

  async scrapeURL (url) {
    return axios.get(
      this.API_URL + '/scrape',
      {
        params: {
          url: url
        }
      })
  }
}

export default RecipeAPIWrapper
