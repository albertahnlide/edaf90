import React from 'react';

function ViewOrder({cart}) {
    return (
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Varukorgen</h2>
          <ul>
          {cart.map((salad) => (
            // <li key={index}>Salad {index + 1}: {salad.getIngredients() + ", " + salad.getPrice()+"kr" }</li> 
            <li key={salad.uuid}>{salad.getIngredients() + ", pris: " + salad.getPrice()+"kr" }</li> 
            
          ))}
        </ul>
        </div>          
    );
    }

export default ViewOrder;