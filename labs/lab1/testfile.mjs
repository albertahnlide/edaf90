import inventory from './inventory.mjs';
// console.log('\n=== beginning of printout ================================')
// console.log('inventory:', inventory);




const names = Object.keys(inventory);
// names
// .sort((a, b) => a.localeCompare(b, "sv", {sensitivity: 'case'}))
// .forEach(name => console.log(name));


const myString = 'choose one of: ' +
names
.sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
.join(", ")
+ '. This is all options we offer';

console.log(myString);

// names.forEach(name => console.log(name));

