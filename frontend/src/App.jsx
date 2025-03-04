import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./Components/AuthForm";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Sell from "./Components/Sell";
import Inventory from "./Components/Inventory";
import Earnings from "./Components/Earnings";
import Messages from "./Components/Messages";
import Reviews from "./Components/Reviews";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
