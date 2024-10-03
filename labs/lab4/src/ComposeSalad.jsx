import { useState } from 'react';
import inventory from './inventory.mjs';
import Salad4 from './Salad4';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { useLoaderData } from 'react-router-dom';


function ComposeSalad(props) {

  

  const inventory = useLoaderData();

  const { addToCart } = useOutletContext();
  const navigate = useNavigate();

  // const foundationList = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [extras, setExtra] = useState('');
  const [dressing, setDressing] = useState('');

  const [touched, setTouched] = useState(false);


  function handleFoundation(event) {
    setFoundation(event.target.value);
    }

    function handleProtein(event) {
      setProtein(event.target.value);
    }

    function handleExtra(event) {
      setExtra({ ...extras, [event.target.name]: event.target.checked });
    }

    function handleDressing(event) {
      setDressing(event.target.value);
    }

    

    function makeOptionsWPrice(inv, property) {
      const options = [
        <option value="" hidden key="placeholder1">Gör ditt val</option>,
        ...Object.entries(inv)
          .filter(([name, properties]) => properties[property])
          .map(([name, properties]) => (
            <option value={name} key={name}>
              {name}, {properties.price}kr
            </option>
          ))
      ];

      return options;
    }

    function makeOptionsWOPrice(inv, property) {
      const options = [
        <option value="" hidden key="placeholder2">Gör ditt val</option>,
        ...Object.entries(inv)
          .filter(([name, properties]) => properties[property])
          .map(([name]) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))
      ];

      return options;
    }

    function makeCheckboxes(inv, property) {
      const checkboxes = Object.entries(inv)
        .filter(([name, properties]) => properties[property])
        .map(([name, properties]) => (
          <span style={{ fontSize: '0.9em' }}>
            <input type="checkbox" name={name} value={name} onChange={handleExtra} checked={extras[name] || false}/> {name} ({properties.price}kr)
          </span>
        ));

      return checkboxes;
    }


    
    function handleSubmit(event) {
      event.preventDefault();

      if(!event.target.checkValidity()){ 
        setTouched(true);
      }
      else{
        setTouched(false);
        // if (
        //   foundation === 'placeholder1' || protein === 'placeholder2' || dressing === 'placeholder2' || Object.values(extras).filter(value => value).length < 2
        // ) {
        //   alert('Du måste fylla i alla fält och välja minst två extras för att beställa en sallad!');
        //   return;
        // }


        const newSalad = new Salad4()
        .add(foundation, inventory[foundation])
        .add(protein, inventory[protein]);
        Object.keys(extras).forEach(name => {
          if (extras[name]) {
            newSalad.add(name, inventory[name]);
          }
        });
        newSalad.add(dressing, inventory[dressing]);
        
        addToCart(newSalad);
    
        
        setFoundation('');
        setProtein('');
        setExtra({});
        setDressing('');
        // navigate('/view-order');
        navigate(`/view-order/confirm/${newSalad.uuid}`);
      }
    }
  return (
    
    <form className={touched ? "was-validated" : ""} onSubmit={handleSubmit} noValidate>

    <div  className="container col-12">
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>

        <fieldset className="col-md-12">


        <div className="mt-4">
          <label htmlFor="foundation" className="form-label">Välj bas (10kr)</label>
          {/* <h5>Välj bas (10kr)</h5> */}
          <select value={foundation} onChange={handleFoundation} className="form-select" id="foundation" required>
            {makeOptionsWOPrice(inventory, 'foundation')}
          </select>
          <div className="invalid-feedback">Du måste välja en bas</div>  {/* Feedback placed here */}
          </div>



          <div className="mt-4">
          <label htmlFor="protein" className="form-label">Välj protein</label>
          {/* <h5>Välj protein</h5> */}
          <select value={protein} onChange={handleProtein} className="form-select" id="protein" required>
            {makeOptionsWPrice(inventory, 'protein')}
          </select>
          <div className="invalid-feedback">Du måste välja ett protein</div>  {/* Feedback placed here */}
          </div>


          <div className="mt-4">
          <label className="form-label" >Välj extra</label>  {/* Ville använda men det blev ett tyst fel med att labeln inte var kopplat till något element */}
          {/* <h5>Välj extra</h5> */}
          <div className="row row-cols-4" id="extra">  
            {(() => {
              const checkboxes = makeCheckboxes(inventory, 'extra');
              return checkboxes.map((checkbox, index) => (
                <div className="col" key={index} required>
                  {checkbox}
                </div>
              ));
            })()}
            </div>
          </div>



          <div className="mt-4">
          <label htmlFor="dressing" className="form-label">Välj dressing (5kr)</label>
          {/* <h5>Välj dressing (5kr)</h5> */}
          <select value={dressing} onChange={handleDressing} className="form-select" id="dressing" required>
            {makeOptionsWOPrice(inventory, 'dressing')}
          </select>
          <div className="invalid-feedback">Du måste välja en dressing</div>  {/* Feedback placed here */}
          </div>


          


          <div> 
          <button type="submit" className="btn btn-primary mt-4">Beställ</button>
          </div>


      </fieldset>
      </div>
    </div>
    </div>
</form>
  );
}
export default ComposeSalad;