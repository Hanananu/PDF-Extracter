import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import UserProfile from "../pages/UserProfile";
import ViewPdf from "../pages/ViewPdf";
import ErrorPage from "../pages/ErrorPage";
import ExtractedPdf from "../pages/ExtractedPdf";
import { BlobProvider } from "../context/BlobContext";

export const clientRoutes = {
  path: "/",
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "view-pdf/:fileName",
      element: (
        <BlobProvider>
          <ViewPdf />
        </BlobProvider>
      ),
    },
    {
      path: "extracted-pdf",
      element: (
        <BlobProvider>
          <ExtractedPdf />
        </BlobProvider>
      ),
    },
    {
      path: "user/:username",
      element: <UserProfile />,
    },
  ],
};

export const clientLogin = {
  path: "/login",
  element: <LoginPage />,
};

export const clientRegister = {
  path: "/register",
  element: <SignUpPage />,
};
