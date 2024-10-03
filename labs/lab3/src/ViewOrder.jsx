import React from 'react';
import './ViewOrder.css';
import { useOutletContext } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function ViewOrder() {
  const { cart = [] } = useOutletContext();

  return (
    <div>
      <Outlet context={{ cart }} />
      <div  className="container col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Varukorgen</h2>
          <fieldset>
            {cart.map((salad) => (
              <div className="orderitem" key={salad.uuid}>
                {salad.getIngredients() + ", pris: " + salad.getPrice() + "kr"}
              </div>
            ))}
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;