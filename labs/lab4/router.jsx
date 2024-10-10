import { createBrowserRouter } from "react-router-dom";
import App from './src/App';
import ComposeSalad from "./src/ComposeSalad";
import ViewOrder from "./src/ViewOrder"; 
import PageNotFound from "./src/PageNotFound";
import OrderConfirmation from "./src/OrderConfirmation";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <PageNotFound/>,
    loader: inventoryLoader,
    children: [
      {
        path: "compose-salad",
        loader: inventoryLoader,
        Component: ComposeSalad,
      },
      {
        path: "view-order",
        // loader: inventoryLoader,
        Component: ViewOrder,
        children: [
          {
            path: "confirm/:uuid", 
            // loader: inventoryLoader,
            Component: OrderConfirmation ,  
          },
        ],
      },
      {
        index: true,
        element: (
          <div className="container col-12">
            <div className="row h-200 p-5 bg-light border rounded-3">
              <h2>Välkommen till min salladsbar</h2>
            </div>
          </div>
        ),
      },
    ],
  },
]);


async function inventoryLoader() {
  // const inventory = { Sallad: { price: 10, foundation: true, vegan: true } };
  const foundationList = await safeFetchJson("http://localhost:8080/foundations");
  const proteinList = await safeFetchJson("http://localhost:8080/proteins");
  const extraList = await safeFetchJson("http://localhost:8080/extras");
  const dressingList = await safeFetchJson("http://localhost:8080/dressings");
  const inventory = {};

 await makeInventory("foundations", foundationList, inventory);
 await makeInventory("proteins", proteinList, inventory);
 await makeInventory("extras", extraList, inventory);
 await makeInventory("dressings", dressingList, inventory);
  
  
  await new Promise(resolve => setTimeout(resolve, 500));
  return inventory;
  }

  async function fetchIngredient(type, name) {
    return await safeFetchJson(`http://localhost:8080/${type}/${name}`);
  }

  async function makeInventory(type, list, inventory){
    const promises = list.map(async (name) => {
      inventory[name] = await fetchIngredient(type, name);
    });
  
    
    await Promise.all(promises);
  }


  function safeFetchJson(url) {
    return fetch(url)
    .then(response => {
      if(!response.ok) {
        throw new Error(`${url} returned status ${response.status}`);
      }
      return response.json();
    });
  }

export default router;