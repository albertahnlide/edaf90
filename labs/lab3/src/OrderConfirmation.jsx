import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { useEffect } from 'react';


const OrderConfirmation = () => {
  const { cart = [] } = useOutletContext(); 
  const { uuid } = useParams(); 
  const item = cart.find((item) => item.uuid === uuid); 

  const navigate = useNavigate();

  useEffect(() => {
    if(!item) {
      navigate("/view-order");
    }
  }, [item, navigate]);

  return (
    item ? (
      <div className="alert alert-success">
        <div key="confirmation">
          En sallad har lagts till i varukorgen. {item.getIngredients()}, pris: {item.getPrice()}kr
        </div>
      </div>
    ) : null
  );
};

export default OrderConfirmation;



