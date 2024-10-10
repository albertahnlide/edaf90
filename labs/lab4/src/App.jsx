import 'bootstrap/dist/css/bootstrap.css'
//import inventory from './inventory.mjs';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useNavigation } from 'react-router-dom';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom'; 
import Salad4 from './Salad4.mjs'
import { useLoaderData } from 'react-router-dom';





function App(props) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const inventory = useLoaderData();
  // let extras = Object.keys(inventory).filter(name => inventory[name].extra);
  Salad4.parse = function(json) {

    const arr = JSON.parse(json);
  
    if (Array.isArray(arr)) {
      const salads = [];
      arr.forEach(salad => {
        const newSalad = new Salad4();
        salad.ingredients.forEach(ingredient => {
          newSalad.add(ingredient.name, inventory[ingredient.name]);
        });
        salads.push(newSalad);
      });
      return salads;
    }
    else {
      const newSalad = new Salad4();
      arr.ingredients.forEach(ingredient => {
        newSalad.add(ingredient.name, inventory[ingredient.name]);
      });
      return newSalad;
    }
  }

  const [cart, setCart] = useState(initFunction); 
  const [orderData, setOrderData] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);

  function initFunction() {
    const jsonCart = window.localStorage.getItem('cart');
    if (jsonCart) {
      return Salad4.parse(jsonCart);
    }
    else {
      return [];
    }
  }

  function addToCart(newSalad) {
    const updatedCart = [...cart, newSalad];
    setCart(updatedCart); 
    
    window.localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  function placeOrder() {
    let json = [];
    cart.forEach((salad) => {
      const ingredients = salad.ingredients.map(ingredient => ingredient.name);
      json.push(ingredients);
    });
    json = JSON.stringify(json);
    
    fetch('http://localhost:8080/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    })
    .then(response => response.json())
    .then((data) => {
      setOrderData(data); 
      setCart([]);
      //window.localStorage.setitem('cart','');
      window.localStorage.removeItem('cart');
      navigate('/view-order');
      setToastVisible(true);
    });
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
      {navigation.state === "loading" ? (<div className='mt-2'> <Spinner /> </div>) : <Outlet context={{ addToCart, cart, placeOrder }} />}
      <Footer />


      {toastVisible && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">Orderbekräftelse</strong>
              <small>{orderData.timestamp}</small> 
              <button type="button" className="btn-close" onClick={() => setToastVisible(false)}></button>
            </div>
            <div className="toast-body">Din order har skickats. <br />
            Antal sallader: {orderData.order.length} <br />
            Pris: {orderData.price}kr <br />
            Order-id: {orderData.uuid}</div>
          </div>
        </div>
      )}


    </div>
  );
}

export default App;
