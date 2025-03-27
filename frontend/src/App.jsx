import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./Components/AuthForm";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Sell from "./Components/Sell";
import Inventory from "./Components/Inventory";
import Earnings from "./Components/Earnings";
import Reviews from "./Components/Reviews";
import OngoingAuctions from "./Components/OngoingAuctions";
import AuctionForm from "./Components/Auction";
import Profile from "./Components/Profile";
import Buy from "./Components/Buy";
import Footer from "./Components/Footer";
import News from "./Components/News";
import CloudinaryUploadTest from "./Components/CloudinaryUploadTest";
import Requests from "./Components/Requests";
import Chatbot from "./Components/Chatbot";
import ViewProduct from "./Components/Viewproduct";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Chatbot />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/auction" element={<OngoingAuctions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/news" element={<News />} />
        <Route path="/newAuction" element={<AuctionForm />} />
        <Route path="/viewproduct/:productId" element={<ViewProduct />} />
        <Route path="/addProduct" element={<CloudinaryUploadTest />} />
        <Route path="/requests" element={<Requests />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
