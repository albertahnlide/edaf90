import { createBrowserRouter } from "react-router-dom";
import App from './src/App';
import ComposeSalad from "./src/ComposeSalad";
import ViewOrder from "./src/ViewOrder";
import ErrorBoundary from './src/ErrorBoundary';  

const router = createBrowserRouter([
  {
    Component: App,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "compose-salad",
        Component: ComposeSalad,
      },
      {
        path: "view-order",
        Component: ViewOrder,
      },
      {
        index: true,
        element: <p>Welcome to my own salad bar</p>,
      }
    ]
  }
]);

export default router;
