import { v4 as uuidv4 } from 'uuid';
class Salad {
    constructor(salad) { 
      this.uuid = uuidv4(); 
      this.id = uuid;
      if (salad instanceof Salad && Array.isArray(salad.ingredients)) {
        this.ingredients = salad.ingredients;
        this.uuid = salad.uuid;
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
    getPrice() {
      return this.ingredients.reduce((sum, ingredient) => sum + ingredient.properties.price, 0);
    }

    getIngredients() {
      return this.ingredients.map(ingredient => ingredient.name).join(' ');
    }

    // parse(json) {

    //   const arr = JSON.parse(json);
    
    //   if (Array.isArray(arr)) {
    //     const salads = [];
    //     arr.forEach(salad => {
    //       const newSalad = new Salad();
    //       salad.ingredients.forEach(ingredient => {
    //         newSalad.add(ingredient.name, inventory[ingredient.name]);
    //       });
    //       salads.push(newSalad);
    //     });
    //     return salads;
    //   }
    //   else {
    //     const newSalad = new Salad();
    //     arr.ingredients.forEach(ingredient => {
    //       newSalad.add(ingredient.name, inventory[ingredient.name]);
    //     });
    //     return newSalad;
    //   }
    // }
  }
  export default Salad;