import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import ForgotYourPassword from "./Authentication/ForgotYourPassword/ForgotYourPassword";
import Registration from "./Authentication/Registration/Registration";
import UserPersonalInformation from "./Pages/UserPersonalInformation/UserPersonalInformation";
import MyOrders from "./Pages/MyOrders/MyOrders";
import MyAddresses from "./Pages/MyAddresses/MyAddresses";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Login from "./Authentication/Login/Login";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import CategoryAndSubcategoryDetails from "./components/CategoryAndSubcategoryDetails/CategoryAndSubcategoryDetails";


const router = createBrowserRouter([
	{
		path: '/',
		element: <Layouts />,

		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/product/:name',
				element: <ProductDetails />,
			},
			{
				path: '/forgot-password',
				element: <ForgotYourPassword />,
			},
			{
				path: '/registration',
				element: <Registration />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/personal-information',
				element: <UserPersonalInformation />,
			},
			{
				path: '/my-orders',
				element: <MyOrders />,
			},
			{
				path: '/my-addresses',
				element: <MyAddresses />,
			},
			{
				path: '/change-password',
				element: <ChangePassword />,
			},
			{
				path: 'about',
				element: <About />,
			},
			{
				path: '/*',
				element: <CategoryAndSubcategoryDetails/>,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
              <Provider store={store}>
                <RouterProvider router={router} />
                </Provider>
);
