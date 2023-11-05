import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <>
      {" "}
      <ErrorBoundary>
        <Nav />
        <Outlet />
        <Footer />
      </ErrorBoundary>
    </>
  );
};

export default App;
