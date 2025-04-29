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

## 🛠️ How to Set Up and Run the Project

### 🔹 Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

### 🔹 Clone the Repository

```bash
git clone https://github.com/yourusername/bidnow.git
cd bidnow
```

---

## 🔹 Backend Setup

### Go to the backend folder:
```bash
cd backend
```

### Install backend dependencies:
```bash
npm install
```

### Create a `.env` file in the `backend` folder and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Start the backend server:
```bash
nodemon index.js
```

---

## 🔹 Frontend Setup

### Go to the frontend folder:
```bash
cd ../frontend
```

### Install frontend dependencies:
```bash
npm install
```

### Start the React development server:
```bash
npm start
```

### Open your browser and navigate to:

- Frontend: [http://localhost:3000](http://localhost:3000)  
- Backend API: [http://localhost:5000/api](http://localhost:5000/api)

---

## 📦 Dependencies

### 🔹 Backend (Express + MongoDB)

- express  
- mongoose  
- dotenv  
- cors  
- bcryptjs  
- jsonwebtoken  

### 🔹 Frontend (React + Tailwind CSS)

- react  
- react-router-dom  
- axios  
- tailwindcss  
- swiper *(for carousels/sliders)*  
- moment or dayjs *(for date formatting)*

---

