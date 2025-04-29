import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuctionDetailsPage = () => {
  const { id } = useParams(); // auction ID from URL
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [topBids, setTopBids] = useState([]);
  const navigate = useNavigate();

  // Fetch auction details and top 3 bids
  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auctions/${id}`);
        setAuction(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching auction:", err);
        setLoading(false);
      }
    };

    const fetchTopBids = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auctions/${id}/bids?limit=3`);
        setTopBids(res.data);
      } catch (err) {
        console.error("Error fetching top bids:", err);
      }
    };

    fetchAuction();
    fetchTopBids();

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!auction) return <div>Auction not found.</div>;

  const isSeller = user && user.role === 'seller' && auction.seller._id === user.userId;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this auction?")) {
      try {
        await axios.delete(`http://localhost:5000/api/auctions/${id}`, { withCredentials: true });
        alert("Auction deleted successfully!");
        navigate("/auctions");
      } catch {
        alert("Error deleting auction");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/auction/${id}/edit`);
  };

  const handleViewAllBids = () => {
    navigate(`/auctions/${id}/allbids`);
  };

  const handlePlaceBid = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to place this bid? You can't delete it after placing."
    );
  
    if (!isConfirmed) {
      return;  // Don't place the bid if user cancels
    }
    if (isNaN(bidAmount) || bidAmount <= auction.currentPrice) {
      alert("Bid amount must be a valid number and higher than the current price.");
      return;
    }
  
    if (!user || user.role !== 'buyer') {
      alert("You must be logged in as a buyer to place a bid.");
      return;
    }

  
    try {
      await axios.post(
        `http://localhost:5000/api/auctions/${id}/bid`,
        { bidAmount: parseFloat(bidAmount) },  // Ensure bidAmount is a number
        { withCredentials: true }
      );
  
      alert("Bid placed successfully!");
      setBidAmount('');
      
      // Refresh auction and top bids
      const updatedAuction = await axios.get(`http://localhost:5000/api/auctions/${id}`);
      const updatedBids = await axios.get(`http://localhost:5000/api/auctions/${id}/bids?limit=3`);
      setAuction(updatedAuction.data);
      setTopBids(updatedBids.data);
  
    } catch (error) {
      console.error("Error placing bid:", error);
      alert(error.response?.data?.error || "Failed to place the bid.");
    }
  };
  

  return (
    <div className="container mx-auto p-4 mt-20">
      <div className="auction-detail-card bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">{auction.title}</h2>
        <div className="flex space-x-4 mb-6">
          <img src={auction.image} alt={auction.title} className="w-48 h-48 object-cover rounded-lg" />
          <div>
            <p className="text-lg font-semibold">Current Price: ${auction.currentPrice}</p>
            <p className="text-md">Started at: {new Date(auction.startTime).toLocaleString()}</p>
            <p className="text-md">Ends In: {new Date(auction.endTime).toLocaleString()}</p>
            <p className="text-md mt-2">Seller: {auction.seller?.name || 'Unknown'}</p>
            <p className="mt-4">{auction.description}</p>
            <p className="text-md mt-4">Status: {auction.status}</p>
          </div>
        </div>

        {/* Place Bid */}
        {user && user.role === 'buyer' && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Place Your Bid</h3>
            <input
              type="number"
              placeholder="Enter your bid amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handlePlaceBid}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Place Bid
            </button>
          </div>
        )}

        {/* Top Bids */}
        <div className="top-bids mt-6">
          <h3 className="text-2xl font-semibold mb-2">Top Bids</h3>
          <ul>
            {topBids.length > 0 ? (
              topBids.map((bid, index) => (
                <li key={bid._id} className="p-2 border-b">
                  <p className="font-semibold">Bid #{index + 1}: ${bid.amount}</p>
                  <p>Bidder: {bid.bidderName}</p>
                </li>
              ))
            ) : (
              <p>No bids placed yet.</p>
            )}
          </ul>
          <button onClick={handleViewAllBids} className="btn btn-link mt-2">
            View All Bids
          </button>
        </div>

        {/* Seller-only buttons */}
        {isSeller && (
          <div className="flex justify-between mt-4">
            <button onClick={handleEdit} className="btn btn-primary">Edit Auction</button>
            <button onClick={handleDelete} className="btn btn-danger">Delete Auction</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionDetailsPage;
