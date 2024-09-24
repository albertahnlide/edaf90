import { useState } from 'react';
import inventory from './inventory.mjs';
import Salad from './Salad';

function ComposeSalad(props) {
  const foundationList = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const [foundation, setFoundation] = useState('placeholder1');
  const [protein, setProtein] = useState('placeholder2');
  const [extras, setExtra] = useState({ Bacon: true, Fetaost: true });
  const [dressing, setDressing] = useState('placeholder2');

  function handelFoundation(event) {
    setFoundation(event.target.value);
    }

    function handelProtein(event) {
      setProtein(event.target.value);
    }

    function handelExtra(event) {
      setExtra({ ...extras, [event.target.name]: event.target.checked });
    }

    function handelDressing(event) {
      setDressing(event.target.value);
    }

    

    function makeOptionsWPrice(inv, prop) {
      const options = [
        <option value="placeholder1" hidden key="placeholder1">Gör ditt val</option>,
        ...Object.entries(inv)
          .filter(([name, properties]) => properties[prop])
          .map(([name, properties]) => (
            <option value={name} key={name}>
              {name}, {properties.price}kr
            </option>
          ))
      ];

      return options;
    }

    function makeOptionsWOPrice(inv, prop) {
      const options = [
        <option value="placeholder2" hidden key="placeholder2">Gör ditt val</option>,
        ...Object.entries(inv)
          .filter(([name, properties]) => properties[prop])
          .map(([name]) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))
      ];

      return options;
    }

    function makeCheckboxes(inv, prop) {
      const checkboxes = Object.entries(inv)
        .filter(([name, properties]) => properties[prop])
        .map(([name, properties]) => (
          <span style={{ fontSize: '0.94em' }}>
            <input type="checkbox" name={name} value={name} onChange={handelExtra} checked={extras[name] || false}/> {name} ({properties.price}kr)
          </span>
        ));

      return checkboxes;
    }


    
    function handleSubmit(event) {
      event.preventDefault();
      const salad = new Salad();
      salad.add(foundation, props.inventory[foundation]);
      salad.add(protein, props.inventory[protein]);
      Object.keys(extras).forEach(name => {
        if (extras[name]) {
          salad.add(name, props.inventory[name]);
        }
      });
      salad.add(dressing, props.inventory[dressing]);
  
      // Call the onAddSalad callback function passed by App
      props.onAddSalad(salad);
  
      // Reset the form
      setFoundation('placeholder1');
      setProtein('placeholder2');
      setExtra({});
      setDressing('placeholder2');
    }

  return (
    <form onSubmit={handleSubmit}>
    <div className="continer col-12</div>">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <fieldset className="col-md-12">


        <div className="mt-4">
          <label htmlFor="foundation" className="form-label">Välj bas (10kr)</label>
          <select value={foundation} onChange={handelFoundation} className="form-select" id="foundation">
            {makeOptionsWOPrice(inventory, 'foundation')}
          </select>
          </div>



          <div className="mt-4">
          <label htmlFor="protein" className="form-label">Välj protein</label>
          <select value={protein} onChange={handelProtein} className="form-select" id="protein">
            {makeOptionsWPrice(inventory, 'protein')}
          </select>
          </div>


          <div className="mt-4">
          <label className="form-label">Välj extra</label>
          <div className="row row-cols-4" id="extra">
            {(() => {
              const checkboxes = makeCheckboxes(inventory, 'extra');
              return checkboxes.map((checkbox, index) => (
                <div className="col" key={index}>
                  {checkbox}
                </div>
              ));
            })()}
            </div>
          </div>



          <div className="mt-4">
          <label htmlFor="dressing" className="form-label">Välj dressing (5kr)</label>
          <select value={dressing} onChange={handelDressing} className="form-select" id="dressing">
            {makeOptionsWOPrice(inventory, 'dressing')}
          </select>
          </div>



          
          <div> 
          <button type="submit" className="btn btn-primary mt-4">Beställ</button>
          </div>


      </fieldset>
      </div>
    </div>
</form>

  );
  
}
export default ComposeSalad;