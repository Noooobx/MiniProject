import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./Components/AuthForm";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Sell from "./Components/Sell";
import Inventory from "./Components/Inventory";
import Earnings from "./Components/Earnings";
import Reviews from "./Components/Reviews";
import Auction from "./Components/Auction";
import Help from "./Components/Help";
import Profile from "./Components/Profile";
import Chatbot from "./Components/Chatbot";
import Buy from "./Components/Buy";
import Footer from "./Components/Footer";
import News from "./Components/News";
import OngoingAuctions from "./Components/OngoingAuctions";
import AuctionForm from "./Components/Auction";
import HelpSupport from "./Components/ HelpSupport";
import ViewProduct from "./ViewProduct";
import OtpTest from "./Components/OtpTest";
import CloudinaryUploadTest from "./Components/CloudinaryUploadTest";
import Requests from "./Components/Requests";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Chatbot />
      {/* <!~~ <OtpTest/> ~~> */}
      {/* <CloudinaryUploadTest /> */}
      <Routes>
        
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/Auction" element={<OngoingAuctions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bot" element={<Chatbot />} />
        <Route path="/Buy" element={<Buy />} />
        <Route path="/news" element={<News />} />
        <Route path="/newAuction" element={<AuctionForm />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/viewproduct/:productId" element={<ViewProduct />} />
        <Route path="/addProduct" element={<CloudinaryUploadTest />} />

        <Route path="/requests" element={<Requests   />} />

        

        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
