import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home'
import Login from './Login'
export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


