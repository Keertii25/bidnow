import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import sellerRoutes from './routes/sellerroute.js';
import buyerRoutes from './routes/buyerroute.js';
import auctionRoutes from './routes/auctionroute.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // only allow your frontend
  credentials: true                // allow cookies / headers
}));

app.use(express.json());
app.use(cookieParser()); 
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/bidnow");
}
main().then(()=>{
    console.log("connected to the dbs");
})
.catch((err)=>{
   console.log(err);
})
app.get("/getdata", (req, res) => {
  res.send("🎉 API is working!");
});
app.use('/api/sellers', sellerRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/auth', authRoutes);
// Start server
app.listen(5000, () => console.log("Server running on port" ));