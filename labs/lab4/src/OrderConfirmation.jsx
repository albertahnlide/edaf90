import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const OrderConfirmation = () => {
  const { cart = [] } = useOutletContext(); // Default to an empty array if cart is undefined
  const { uuid } = useParams(); // Get the uuid from the URL parameters
  const item = cart.find((item) => item.uuid === uuid); // Find the item with the matching uuid

  return (
      <div className=" p-4 border rounded-3 mb-2" style={{ backgroundColor: 'rgba(20, 140, 50, 0.3)' }}>
        <div key={item.uuid}>
          En sallad har lagts till i varukorgen. {item.getIngredients()}, pris: {item.getPrice()}kr
        </div>
      </div>
  );
};

export default OrderConfirmation;
