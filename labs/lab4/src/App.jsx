import 'bootstrap/dist/css/bootstrap.css'
//import inventory from './inventory.mjs';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useNavigation } from 'react-router-dom';
import Spinner from './Spinner';




function App(props) {
  const navigation = useNavigation();
  // let extras = Object.keys(inventory).filter(name => inventory[name].extra);

  const [cart, setCart] = useState([]); 


  function addToCart(newSalad) {
    setCart(cart => [...cart, newSalad]); 
  }


  function Header(){
    return (
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>
    );
  }

  function Footer() {
    return (
      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    );
  }

  return (
    <div className="container col-12">
      <Header />
      <Navbar />
      {navigation.state === "loading" ? <Spinner /> : <Outlet context={{ addToCart, cart }} />}
      <Footer />
    </div>
  );
}

export default App;
