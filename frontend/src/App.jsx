import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./Components/AuthForm";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Sell from "./Components/Sell";
import Inventory from "./Components/Inventory";
import Earnings from "./Components/Earnings";
import Messages from "./Components/Messages";
import Reviews from "./Components/Reviews";
import Auction from "./Components/Auction";
import Help from "./Components/Help";
import Profile from "./Components/Profile";
import Chatbot from "./Components/Chatbot";
import Buy from "./Components/Buy";
import Footer from "./Components/Footer";

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
        <Route path="/Auction" element={<Auction />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bot" element={<Chatbot />} />
        <Route path="/Buy" element={<Buy />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
