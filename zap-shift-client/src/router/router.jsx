import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import LogIn from "../pages/Home/LogIn";
import Registration from "../pages/Home/Registration";
import Coverage from "../pages/Home/Coverage/Coverage";
import AddParcelForm from "../pages/AddParcelForm";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: "coverage",
            Component: Coverage,
            loader: () => fetch("/warehouses.json")
          },
          {
            path: "addpercel",
            Component: AddParcelForm,
            loader: () => fetch("/warehouses.json")

        },

    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: LogIn
      },
      {
        path: 'register',
        Component: Registration
      },
    ]
  }
]);
