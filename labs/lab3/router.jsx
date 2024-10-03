import { createBrowserRouter } from "react-router-dom";
import App from './src/App';
import ComposeSalad from "./src/ComposeSalad";
import ViewOrder from "./src/ViewOrder"; 
import PageNotFound from "./src/PageNotFound";
import OrderConfirmation from "./src/OrderConfirmation";

const router = createBrowserRouter([
  {
    Component: App,
    errorElement: <PageNotFound/>,
    children: [
      {
        path: "compose-salad",
        Component: ComposeSalad,
      },
      {
        path: "view-order",
        Component: ViewOrder,
        children: [
          {
            path: "confirm/:uuid", 
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

export default router;