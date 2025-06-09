import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Title from "../components/Title";

/**
 *
 * This layout wraps all routes. It includes:
 * - The application title/header
 * - A navigation bar
 * - The content of the current route (via <Outlet />)
 */
export default function RootLayout() {
  return (
    <div className="container">
      <Title />
      <Navbar />
      <Outlet />
    </div>
  );
}
