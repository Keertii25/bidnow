import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeaturedAuctions = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auctions/live');
        setAuctions(res.data);
      } catch (err) {
        console.error('Error fetching auctions', err);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className="my-12 px-4">
      <h2 className="text-2xl font-medium mb-6 text-center"> Hot Live Auctions</h2>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {auctions.map((auction) => (
          <div
            key={auction._id}
            className="w-full h-[400px] bg-gray-900 text-white rounded-sm overflow-hidden shadow-lg relative"
          >
            <img
              src={auction.image}
              alt={auction.title}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black via-transparent to-transparent">
              <h3 className="text-xl font-bold">{auction.title}</h3>
              <p className="text-sm">{auction.description}</p>
              <p className="mt-2 text-lg font-semibold">Current Bid: ₹{auction.currentPrice}</p>
              <p className="text-sm">Seller: {auction.seller.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedAuctions;

