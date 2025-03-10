import router from "./Routes/Route";
import { RouterProvider } from "react-router-dom";
import AlertListener from "./components/RequestForm/AlertListener"; // Import AlertListener
import "./index.css";
import Chat from "./Chat";
export default function App() {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  return (
    <>
      <AlertListener /> {/* Ensures all users receive real-time alerts */}
      <Chat apiKey={apiKey}/>
      <RouterProvider router={router} />
    </>
  );
}
