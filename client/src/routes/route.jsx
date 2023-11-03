import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import UserProfile from "../pages/UserProfile";
import ViewPdf from "../pages/ViewPdf";
import ErrorPage from "../pages/ErrorPage";


export const clientRoutes =

  {
    path: "/",
    element:<App />,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: "/",
        element:<HomePage/>,
      },
      {
        path:"viewpdf/:fileName",
        element:<ViewPdf/>,
      },
      {
        path:"user/:username",
        element:<UserProfile/>

      },
    ],
  }

 export const clientLogin ={
    path:"/login",
    element:<LoginPage/>
  }
  
 export const clientRegister= {
    path:"/register",
    element:<SignUpPage/>,
  }
 