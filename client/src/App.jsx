import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./components/Nav";
import ErrorBoundary from "./components/ErrorBoundary";
import { useUserData } from "./context/UserContext";

const App = () => {
  const { user } = useUserData();
  const router = useNavigate();

  useEffect(() => {
    if (!user) return router("/login");
  }, []);

  return (
    <ErrorBoundary>
      <Nav />
      <Outlet />
    </ErrorBoundary>
  );
};

export default App;
