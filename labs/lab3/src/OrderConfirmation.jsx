import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const OrderConfirmation = () => {
  const { cart = [] } = useOutletContext(); 
  const { uuid } = useParams(); 
  const item = cart.find((item) => item.uuid === uuid); 
  return (
      <div className=" p-4 border rounded-3 mb-2" style={{ backgroundColor: 'rgba(20, 140, 50, 0.3)' }}>
        <div key={item.uuid}>
          En sallad har lagts till i varukorgen. {item.getIngredients()}, pris: {item.getPrice()}kr
        </div>
      </div>
  );
};

export default OrderConfirmation;
