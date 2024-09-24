import 'bootstrap/dist/css/bootstrap.css'
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import Salad from './Salad';
import { useState } from 'react';
import ViewOrder from './ViewOrder';

function App() {
  let extras = Object.keys(inventory).filter(name => inventory[name].extra);

  const [cart, setCart] = useState([]); 


  function addToCart(newSalad) {
    setCart(cart => [...cart, newSalad]); 
  }

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>

      <ViewOrder cart={cart}></ViewOrder>

      <ComposeSalad inventory={inventory} onAddToCart={addToCart}> </ComposeSalad> 
      


      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;