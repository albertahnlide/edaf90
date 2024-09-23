import { v4 as uuidv4 } from 'uuid';
class Salad {
    static #instanceCounter = 0;
    constructor(salad) { 
      this.uuid = uuidv4(); 
      this.id = 'salad_' + Salad.#instanceCounter++;
      if (salad instanceof Salad && Array.isArray(salad.ingredients)) {
        this.ingredients = salad.ingredients;
      } else {
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
  }
  export default Salad;