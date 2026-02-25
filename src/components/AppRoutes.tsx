import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.js";
import Home from "../pages/Home.js";
import Dashboard from "../pages/Dashboard.js";
import Login from "../pages/Login.js";
import NotFound from "../pages/NotFound.js";
import UserProvider from "./UserContext.js";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

const AppRoutes: React.FC = () => {
	return (
		<UserProvider>
			<RouterProvider router={router} />
		</UserProvider>
	);
};

export default AppRoutes;