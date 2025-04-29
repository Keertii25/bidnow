import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewAllBidsPage = () => {
  const { id } = useParams();  // Get auction ID from URL parameters
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auctions/${id}/allbids`);
        setBids(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bids:', error);
        setLoading(false);
      }
    };

    fetchBids();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (bids.length === 0) return <div>No bids placed yet.</div>;

  return (
    <div className="container mx-auto p-4 mt-20">
      <h2 className="text-3xl font-bold mb-4">All Bids for Auction</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ul>
          {bids.map((bid, index) => (
            <li key={bid._id} className="p-2 border-b">
              <p className="font-semibold">Bid #{index + 1}: ${bid.amount}</p>
              <p>Bidder: {bid.bidder?.username || 'Unknown'}</p>
              <p>Placed at: {new Date(bid.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewAllBidsPage;
