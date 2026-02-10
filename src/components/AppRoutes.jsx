import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "../pages/Home.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Login.jsx";
import NotFound from "../pages/NotFound.jsx";
import UserProvider from "./UserContext.jsx";

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
      },{
        path: "*",
        element: <NotFound />
      }
    ],
  },
]);


function AppRoutes() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default AppRoutes