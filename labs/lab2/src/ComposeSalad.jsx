import { useState } from 'react';
import inventory from './inventory.mjs';

function ComposeSalad(props) {
  const foundationList = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const [foundation, setFoundation] = useState('Pasta');
  const [extras, setExtra] = useState({ Bacon: true, Fetaost: true });

  function handelFoundation(event) {
    setFoundation(event.target.value);
    }

    function makeOptions(inv, prop) {
      const options = Object.entries(inv)
        .filter(([name, properties]) => properties[prop])
        .map(([name, properties]) => (
          <option value={name} key={name}>
            {name}, {properties.price} kr
          </option>
        ));

      return options;
    }
    


  return (
    <div className="continer col-12</div>">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <fieldset className="col-md-12">
          <label htmlFor="foundation" className="form-label">Välj bas</label>
          <select value={foundation} onChange={handelFoundation} className="form-select" id="foundation">
            {makeOptions(inventory, 'foundation')}

            {/* <option key="Sallad" value="Sallad">Salad</option>
            <option key="Pasta" value="Pasta">Pasta</option> */}
          </select>

          <div style={{ padding: '10px 0' }}></div>

          <label htmlFor="protein" className="form-label">Välj protein</label>
          <select value={foundation} onChange={handelFoundation} className="form-select" id="protein">
            {makeOptions(inventory, 'protein')}


             
          </select>

          <div style={{ padding: '10px 0' }}></div>

          <label htmlFor="extra" className="form-label">Välj extra</label>
          <select value={foundation} onChange={handelFoundation} className="form-select" id="extra">
            {makeOptions(inventory, 'extra')}
          </select>

          <div style={{ padding: '10px 0' }}></div>

          <label htmlFor="dressing" className="form-label">Välj dressing</label>
          <select value={foundation} onChange={handelFoundation} className="form-select" id="dressing">
            {makeOptions(inventory, 'dressing')}
          </select>
      </fieldset>

      </div>
    </div>
  );
}
export default ComposeSalad;