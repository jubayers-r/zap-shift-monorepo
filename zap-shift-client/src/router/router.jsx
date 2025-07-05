import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import LogIn from "../pages/Home/LogIn";
import Registration from "../pages/Home/Registration";
import Coverage from "../pages/Home/Coverage/Coverage";
import AddParcelForm from "../pages/AddParcelForm";
import PrivetRoute from "../routes/PrivetRoute";
import Dashboard from "../pages/Dashboard/Dashboard";

import Payment from "../pages/Dashboard/Payment/Payment";
import MyParcels from "../pages/Dashboard/MyParcels";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/warehouses.json"),
      },
      {
        path: "addparcel",
        element: (
          <PrivetRoute>
            <AddParcelForm />
          </PrivetRoute>
        ),
        loader: () => fetch("/warehouses.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: LogIn,
      },
      {
        path: "register",
        Component: Registration,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <Dashboard />
      </PrivetRoute>
    ),
    children: [
      {
        path: "myParcels",
        Component: MyParcels,
      },
      {
        path: "payment/:id",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
    ],
  },
]);
