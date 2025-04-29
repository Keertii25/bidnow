import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditAuctionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [auction, setAuction] = useState({
    title: '',
    description: '',
    startingPrice: 0,
    currentPrice: 0,
    image: '',
    startTime: '',
    endTime: '',
    status: '', // Add status field
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/auctions/${id}`)
      .then((response) => {
        const fetchedAuction = response.data;

        // Convert times to Date objects for comparison
        const start = new Date(fetchedAuction.startTime);
        const end = new Date(fetchedAuction.endTime);
        const current = new Date();

        // Set auction status based on current time
        let status = 'upcoming';
        if (current >= start && current <= end) {
          status = 'live';
        } else if (current > end) {
          status = 'ended';
        }

        // Update auction state with status
        setAuction({
          ...fetchedAuction,
          status: status, // Add the status here
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching auction:', err);
        setError('Could not fetch auction details.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAuction((prevAuction) => {
      const updatedAuction = { ...prevAuction, [name]: value };

      // Live endTime validation
      if (name === 'endTime') {
        const start = new Date(updatedAuction.startTime);
        const end = new Date(value);
        if (end <= start) {
          setValidationError('End time must be later than the start time.');
        } else {
          setValidationError('');
        }
      }

      return updatedAuction;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(auction.endTime) <= new Date(auction.startTime)) {
      setValidationError('End time must be later than the start time.');
      return;
    }

    setValidationError('');

    axios
      .put(`http://localhost:5000/api/auctions/${id}`, auction, { withCredentials: true })
      .then(() => {
        alert('Auction updated successfully!');
        navigate(`/auctions/${id}`, { replace: true });
      })
      .catch((err) => {
        console.error('Error updating auction:', err);
        alert('Error updating auction.');
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container my-3 mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Edit Auction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold">Title</label>
          <input type="text" id="title" name="title" value={auction.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold">Description</label>
          <textarea id="description" name="description" value={auction.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Starting Price */}
        <div>
          <label htmlFor="startingPrice" className="block text-sm font-semibold">Starting Price ($)</label>
          <input type="number" id="startingPrice" name="startingPrice" value={auction.startingPrice} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Current Price */}
        <div>
          <label htmlFor="currentPrice" className="block text-sm font-semibold">Current Price ($)</label>
          <input type="number" id="currentPrice" name="currentPrice" value={auction.currentPrice} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-semibold">Image URL</label>
          <input type="text" id="image" name="image" value={auction.image} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Start Time (readonly) */}
        <div>
          <p className="text-md">Started at: {auction.startTime}</p>
        </div>

        {/* End Time */}
        <div>
          <label htmlFor="endTime" className="block text-sm font-semibold">End Time</label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={auction.endTime}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${validationError ? 'border-red-500' : ''}`}
            required
          />
          {validationError && (
            <p className="text-red-600 text-sm mt-1">{validationError}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <p className="text-sm font-semibold">Status: {auction.status}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="button" onClick={() => navigate(`/auction/${id}`)} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditAuctionPage;


