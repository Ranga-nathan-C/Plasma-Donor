import { createBrowserRouter } from "react-router-dom";
import Login from "../Login";
import Home from "../Home";
import Signup from "../Signup";
import Home2 from "../Home2";
import ContactUs from "../ContactUs";
import RegistrationForm from "../registration";
import ProfileCompletion from "../profile";
import MedicalEligibilityScreening from "../eligiblity";
import ConsentAndAgreements from "../consent";
import CommunityEngagement from "../engagement";
import VerificationStep from "../verification";
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
    },{
        path:"/Registration",
        element:<RegistrationForm/>
    },{
        path:"/Profile",
        element:<ProfileCompletion/>
    },{
        path:"/Eligiblity",
        element:<MedicalEligibilityScreening/>
    },{
        path:"/Consent",
        element:<ConsentAndAgreements/>
    },{
        path:"/Engagement",
        element:<CommunityEngagement/>
    },{
        path:"Verification",
        element:<VerificationStep/>
    }

]);
export default router;