import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css';
import PageOne from './PageOne';
import PageTwo from './PageTwo';

const route = createBrowserRouter([
  {
    path : '/' , element : <PageOne />
  },
  {
    path : '/confirm' , element : <PageTwo />
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {route}/>
  </React.StrictMode>
);