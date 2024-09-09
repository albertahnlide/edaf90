'use strict';
/**
 * Reflection question 1
 * your answer goes here
 */

import inventory from './inventory.mjs';
import { v4 as uuidv4 } from 'uuid';



console.log('\n=== beginning of printout ================================')
console.log('inventory:', inventory);

console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n--- for ... in ---------------------------------------')
for (const name in inventory) {
  console.log(name);
}
/**
 * Reflection question 2
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
  const options = Object.entries(inv)
    .filter(([name, properties]) => properties[prop])
    .map(([name, properties]) => `<option value="${name}" key="${name}">${name}, ${properties.price} kr</option>`);

  return options;
}


console.log(makeOptions(inventory, 'protein'));

console.log('\n--- Assignment 2 ---------------------------------------')

class Salad {
  static instanceCounter = 0;
  constructor(salad) { 
    const uuid = uuidv4(); 
    this.id = 'salad_' + Salad.instanceCounter++;
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

let myCaesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');


console.log('\n--- Assignment 3 ---------------------------------------')

Salad.prototype.getPrice = function() {
  return this.ingredients.reduce((sum, ingredient) => sum + ingredient.properties.price, 0);
}


Salad.prototype.count = function(prop) {
  return this.ingredients.filter(ingredient => ingredient.properties[prop]).length;
}


console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr

console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos


console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör


console.log('\n--- reflection question 3 ---------------------------------------')
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
// console.log('typeof Object.getPrototypeOf(Salad): ' + typeof Object.getPrototypeOf(Salad));
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
// console.log('Object.getPrototypeOf(Salad): '+Object.getPrototypeOf(Salad));
// console.log('Salad.prototype: '+ Salad.prototype)
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad)));
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));



console.log('\n--- Assignment 4 ---------------------------------------')

Salad.parse = function(json) {

const arr = JSON.parse(json);

if (Array.isArray(arr)) {
  const salads = [];
  arr.forEach(salad => {
    const newSalad = new Salad();
    salad.ingredients.forEach(ingredient => {
      newSalad.add(ingredient.name, inventory[ingredient.name]);
    });
    salads.push(newSalad);
  });
  return salads;
}
else {
  const newSalad = new Salad();
  arr.ingredients.forEach(ingredient => {
    newSalad.add(ingredient.name, inventory[ingredient.name]);
  });
  return newSalad;
  }
}


const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad)+ '\n');
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy)+ '\n');
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy)+ '\n');
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy)+ '\n');

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')


class GourmetSalad extends Salad{

  constructor(ingredients) {
    super(ingredients);
  }

  add(name, properties, size=1) {
    let existingIngredient = this.ingredients.find(ingredient => ingredient.name === name);
    if (existingIngredient) {
      existingIngredient.properties.size += size;
    } else {
      properties = {...properties, size};
      this.ingredients.push({name, properties});
    }
    return this;
  }
  getPrice() {
    return this.ingredients.reduce((sum, ingredient) => sum + ingredient.properties.price * ingredient.properties.size, 0);
  }
}


let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------')


console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);


/**
 * Reflection question 4
 */

// Static properties are stored in the constructor function itself.

/**
 * Reflection question 5
 */

// // Detta visste jag inte men tydligen funkar detta lol
// Object.defineProperty(Salad.prototype, 'id', {
//   writable: false
// });


/**
 * Reflection question 6
 */


// Yes you can use # before a name. 


console.log('\n--- Assignment 7 ---------------------------------------')
Salad.prototype.uuid = uuidv4();

console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);



// Tror och hoppas att detta är rätt