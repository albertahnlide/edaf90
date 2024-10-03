import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const OrderConfirmation = () => {
  const { cart = [] } = useOutletContext(); 
  const { uuid } = useParams(); 
  const item = cart.find((item) => item.uuid === uuid); 
  return (
      <div className="alert alert-success">
        <div key={item.uuid}>
          En sallad har lagts till i varukorgen. {item.getIngredients()}, pris: {item.getPrice()}kr
        </div>
      </div>
  );
};

export default OrderConfirmation;
