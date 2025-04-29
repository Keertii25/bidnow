import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateAuction = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    startingPrice: '',
    startTime: '',
    endTime: '',
    seller: '', // Seller will be set automatically
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Automatically fetch seller ID from localStorage
    const sellerId = localStorage.getItem('sellerId');
    // Assuming you store seller's ID in localStorage
    if (sellerId) {
      setForm((prevState) => ({
        ...prevState,
        seller: sellerId,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const now = new Date();

    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.image.trim()) newErrors.image = 'Image URL is required';

    if (!form.startingPrice || isNaN(form.startingPrice) || Number(form.startingPrice) <= 0)
      newErrors.startingPrice = 'Starting price must be a positive number';

    const start = new Date(form.startTime);
    const end = new Date(form.endTime);

    if (!form.startTime || start <= now)
      newErrors.startTime = 'Start time must be in the future';
    if (!form.endTime || end <= start)
      newErrors.endTime = 'End time must be after start time';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    try {
      const token = localStorage.getItem('authToken');
      console.log('Token:', token); // Log token for debugging
      if (!token) {
        alert('No authentication token found!');
        return;
      }
  
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`, // Attach token in Authorization header
        },
        withCredentials: true, // Ensure credentials (cookies) are sent with the request
      };
  
      const response = await axios.post(
        'http://localhost:5000/api/auctions',
        form, // Auction form data
        config // Include token in headers
      );
  
      if (response.status === 201) {
        alert('Auction created successfully!');
        setForm({
          title: '',
          description: '',
          image: '',
          startingPrice: '',
          startTime: '',
          endTime: '',
          seller: '',
        });
        setErrors({});
      }
    } catch (error) {
      console.error(error);
      alert('Error creating auction');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
      <h2 className="text-2xl font-bold mb-4">Create New Auction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'description', 'image', 'startingPrice', 'startTime', 'endTime'].map((field) => (
          <div key={field}>
            <input
              type={field.includes('Time') ? 'datetime-local' : field === 'startingPrice' ? 'number' : 'text'}
              name={field}
              placeholder={field}
              value={form[field]}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors[field] ? 'border-red-500' : ''}`}
            />
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
          </div>
        ))}
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateAuction;


