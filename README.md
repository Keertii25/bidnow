# BidNow 🎯

**BidNow** is a full-stack online auction platform that allows users to buy and sell products through real-time bidding. Designed with a clean and responsive UI, BidNow supports role-based authentication for sellers and buyers, real-time auction status updates, and secure listings.

## 🚀 Features

- 🔐 **Authentication & Authorization**
  - Separate login/signup flows for buyers and sellers
  - Password hashing with salting (planned or implemented)
  - Protected routes based on user role

- 🛍️ **Auction Listings**
  - Sellers can create, edit, and delete auctions
  - Auctions include title, description, images, pricing, and duration
  - Auctions classified as *upcoming*, *live*, or *ended*

- 🎥 **Live Auction View**
  - Real-time updates on bids (planned via WebSockets or polling)
  - Live display of current price and remaining time


## 🛠️ Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (with Mongoose)
- **Auth**: JWT-based Authentication (planned)
- **Real-time**: WebSockets (planned)



