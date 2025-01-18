import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import ProductDetails from "./components/ProductDetails/ProductDetails";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layouts />,

        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/product/:name",
                element: <ProductDetails />,
            },
            {
                path: "about",
                element: <About />,
            },
    
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
                <RouterProvider router={router} />
    
);
