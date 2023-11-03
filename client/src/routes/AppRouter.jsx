import { createBrowserRouter } from "react-router-dom";
import { clientRoutes,clientLogin,clientRegister } from "./route";



const AppRouter = createBrowserRouter([
     clientLogin,
     clientRegister,
     clientRoutes,
])

export default AppRouter
