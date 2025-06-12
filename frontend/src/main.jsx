import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./Pages/Index.jsx";
import Actors from "./Pages/Actors.jsx";
import Actor from "./Pages/Actor.jsx";

import "./styles/global.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/search",
    element: <Actors />,
  },
  {
    path: "/actor/:id",
    element: <Actor />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
