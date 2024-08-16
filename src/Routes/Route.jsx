import { createBrowserRouter } from "react-router-dom";
import Login from "../Login";
import Home from "../Home";
import Signup from "../Signup";
import Home2 from "../Home2";
import ContactUs from "../ContactUs";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/Signup",
        element: <Signup />,
    },
    {
        path:"/Home2",
        element:<Home2 />,
    },
    {
        path: "/ContactUs",
        element:<ContactUs />
    }

]);
export default router;