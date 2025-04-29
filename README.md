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

🔹 Backend Setup
Go to the backend folder:

bash
Copy
Edit
cd backend
Install backend dependencies:

bash
Copy
Edit
npm install
Create a .env file in the backend folder and add:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start the backend server:

bash
Copy
Edit
npm run dev
🔹 Frontend Setup
Go to the frontend folder:

bash
Copy
Edit
cd ../frontend
Install frontend dependencies:

bash
Copy
Edit
npm install
Start the React development server:

bash
Copy
Edit
npm start
Open your browser and navigate to:

Frontend: http://localhost:3000

Backend API: http://localhost:5000/api

📦 Dependencies
🔹 Backend (Express + MongoDB)
express

mongoose

dotenv

cors

bcryptjs

jsonwebtoken

multer (if handling image uploads)

morgan (for logging API requests)

🔹 Frontend (React + Tailwind)
react

react-router-dom

axios

tailwindcss

swiper (for carousels/sliders)

moment or dayjs (for date formatting)

