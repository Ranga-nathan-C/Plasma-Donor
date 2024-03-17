import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup";


const router = createBrowserRouter([
    {
        path: "/",
        element:<Home />
    },
    {
        path: "/Login",
        element:<Login />
    },
    {
        path: "/Signup",
        element:<Signup />
    }
    
])
export default router;