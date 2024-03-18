import "./App.css";
import router from "./Routes/Route";
import { RouterProvider } from "react-router-dom";

export default function App() {
  return <RouterProvider router={router} />;
}

