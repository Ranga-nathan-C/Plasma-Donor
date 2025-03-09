import router from "./Routes/Route";
import { RouterProvider } from "react-router-dom";
import AlertListener from "./components/RequestForm/AlertListener"; // Import AlertListener
import "./index.css";

export default function App() {
  return (
    <>
      <AlertListener /> {/* Ensures all users receive real-time alerts */}
      <RouterProvider router={router} />
    </>
  );
}
