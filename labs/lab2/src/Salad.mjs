import { v4 as uuidv4 } from 'uuid';
class Salad {
    static #instanceCounter = 0;
    constructor(salad) { 
      this.id = 'salad_' + Salad.#instanceCounter++;
      if (salad instanceof Salad && Array.isArray(salad.ingredients)) {
        this.ingredients = salad.ingredients;
        this.uuid = salad.uuid;
      } else {
        this.uuid = uuidv4(); 
        this.ingredients = [];
      }
    }
    add(name, properties) {
      this.ingredients.push({name, properties});
      return this;
     }
    remove(name) { 
      this.ingredients = this.ingredients.filter(ingredient => ingredient.name !== name);
      return this;
    }
    getPrice() {
      return this.ingredients.reduce((sum, ingredient) => sum + ingredient.properties.price, 0);
    }

    getIngredients() {
      return this.ingredients.map(ingredient => ingredient.name).join(' ');
    }
  }
  export default Salad;