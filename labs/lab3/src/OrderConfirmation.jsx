import React from 'react';
import { useParams, useOutletContext } from 'react-router-dom';

function OrderConfirmation() {
  const { uuid } = useParams();  
  const { cart } = useOutletContext(); 

  // Find the salad in the cart using the UUID
  const salad = cart.find(item => item.uuid === uuid); 

  if (!salad) {
    return <h4>Order not found!</h4>;
  }

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Order ID: {uuid}</p>
      <p>Your salad has been successfully added to the order!</p>

      <h4>Salad Details:</h4>
      <ul>
        <li>Foundation: {salad.ingredients.find(ingredient => ingredient.name === 'foundation')?.properties?.name}</li>
        <li>Protein: {salad.ingredients.find(ingredient => ingredient.name === 'protein')?.properties?.name}</li>
        <li>Extras: {salad.ingredients.filter(ingredient => ingredient.name === 'extra').map(ingredient => ingredient.properties.name).join(", ")}</li>
        <li>Dressing: {salad.ingredients.find(ingredient => ingredient.name === 'dressing')?.properties?.name}</li>
      </ul>

      <h4>Your Shopping Basket:</h4>
      <ul>
        {cart.map((item, index) => (
          <li key={item.uuid}>
            Salad {index + 1}: {item.getIngredients() + ", price: " + item.getPrice() + "kr"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderConfirmation;
