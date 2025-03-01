import { createBrowserRouter } from "react-router-dom";
import Login from "../Login";
import Home from "../Home";

import Registration from "../components/Registration/Registration";
import Verification from "../components/Registration/Verification";
import Profile from "../components/Registration/Profile";
import Engagement from "../components/Registration/Engagement";
import Eligibility from "../components/Registration/Eligibility";
import Consent from "../components/Registration/Consent";
import Dashboard from "../components/Dashboard/Dashboard";

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
    path: "/Home2",
    element: <Home2 />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/ContactUs",
    element: <ContactUs />,
  },
  {
    path: "/Register",
    element: <Registration />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/Eligibility",
    element: <Eligibility />,
  },
  {
    path: "/Consent",
    element: <Consent />,
  },
  {
    path: "/Engagement",
    element: <Engagement />,
  },
  {
    path: "Verification",
    element: <Verification />,
  },
]);
export default router;
