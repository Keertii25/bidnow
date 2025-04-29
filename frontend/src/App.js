import React, { useEffect, useState } from "react";
import Axios from "axios";
import './index.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Auctions from './pages/AllAuctions';
import CreateAuction from "./pages/CreateAuction";
import AuctionDetail from "./pages/AuctionDetail";
import EditAuction from "./pages/EditAuction";
import SellerLogin from "./pages/Sellerlogin";
import SellerSignup from "./pages/SellerSignup";
import BuyerLogin from "./pages/Buyerlogin";
import BuyerSignup from "./pages/Buyersignin";
import Bidsdetails from "./pages/biddetails";
const App=()=>{
  return(
    <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/create-auction" element={<CreateAuction />} />
        <Route path="/auctions/:id" element={<AuctionDetail/>} />
        <Route path="/auction/:id/edit" element={<EditAuction/>} />
        <Route path="/seller/login" element={<SellerLogin/>} />
        <Route path="/seller/signup" element={<SellerSignup/>} />
        <Route path="/buyer/login" element={<BuyerLogin/>}/>
        <Route path="/buyer/signup" element={<BuyerSignup />}/>
        <Route path="/auctions/:id/allbids" element={<Bidsdetails />}/>
        
        

      </Routes>
    </Layout>
  </Router>
  )
}
export default App; 
 