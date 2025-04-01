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
import MyAuctions from "./Components/MyAuctions";
import ConfirmBuy from "./Components/ConfirmBuy";
import Benefit from "./Components/Benefits";
import Orders from "./Components/Orders";
import FinishedOrders from "./Components/FinishedOrders";
import WonAuctions from "./Components/WonAuctions";
import PickupForm from "./Components/PickupForm";
import ResetPassword from "./Components/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Chatbot />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/dashboard" element={<Sell />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/myAuction" element={<MyAuctions />} />
        <Route path="/auction" element={<OngoingAuctions />} />
        <Route path="/view-orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/news" element={<News />} />
        <Route path="/newAuction" element={<AuctionForm />} />
        <Route path="/viewproduct/:id" element={<ViewProduct />} />
        <Route path="/addProduct" element={<CloudinaryUploadTest />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/confirm-buy" element={<ConfirmBuy />} />
        <Route path="/benefits" element={<Benefit />} />
        <Route path="/view-history" element={<FinishedOrders />} />
        <Route path="/won-auctions" element={<WonAuctions />} />
        <Route path="/auction-pickup/:id" element={<PickupForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
