import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import { ProductProvider } from "./ProductContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageOne />,
  },
  {
    path: "/confirm",
    element: <PageTwo />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  </React.StrictMode>
);
