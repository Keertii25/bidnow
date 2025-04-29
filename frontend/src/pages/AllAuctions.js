import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllAuctionsPage = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auctions');
        setAuctions(res.data);
      } catch (err) {
        console.error('Error fetching auctions:', err);
      }
    };

    fetchAuctions();
  }, []);

  const getAuctionStatus = (startTime, endTime) => {
    const now = new Date();
    if (new Date(startTime) <= now && new Date(endTime) > now) {
      return 'live';
    } else if (new Date(endTime) <= now) {
      return 'ended';
    } else {
      return 'upcoming';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Auctions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => {
          const status = getAuctionStatus(auction.startTime, auction.endTime);
          return (
            <Link to={`/auctions/${auction._id}`} key={auction._id}>
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <img
                  src={auction.image}
                  alt={auction.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{auction.title}</h2>
                  <p className="text-gray-600 text-sm mb-2">
                    {auction.description?.slice(0, 100)}...
                  </p>
                  <div className="text-sm text-gray-500 mb-2">
                    <span>Starting Price: </span>
                    <strong>${auction.startingPrice}</strong>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    <span>Current Price: </span>
                    <strong>${auction.currentPrice}</strong>
                  </div>
                  <div className="text-sm text-gray-500">
                    Status: <span className="capitalize font-medium">{status}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AllAuctionsPage;
