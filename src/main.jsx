import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Home from "./Pages/Home/Home";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layouts />,

        children: [
            {
                path: "/",
                element: <Home />,
            },
            // {
            //     path: "our-goal",
            //     element: <OurGoal />,
            // },
    
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
                <RouterProvider router={router} />
    
);
