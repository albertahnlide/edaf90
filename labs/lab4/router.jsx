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
  const inventory = { Sallad: { price: 10, foundation: true, vegan: true } };
  await new Promise(resolve => setTimeout(resolve, 500));
  return inventory;
  }

export default router;