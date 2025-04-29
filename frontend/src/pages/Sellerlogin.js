import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SellerLogin() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); //  Prevent default form submit

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { emailOrUsername, password, role: 'seller' },
        { withCredentials: true }
      );
      localStorage.setItem('user', JSON.stringify({ userId: response.data.userId, role: 'seller' }));
      localStorage.setItem('authToken', response.data.token);
       localStorage.setItem('sellerId', response.data.userId);
       window.dispatchEvent(new Event('authChanged'));

    // Display a message with the seller's ID
    alert(`Login successful! Welcome`);
      navigate('/');
    } catch (error) {
        console.log("Full error:", error);
        console.log("Error response:", error?.response);
        const errMsg = error?.response?.data?.error || 'Login failed';
        alert(errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Seller Login</h2>
        <input
          type="text"
          placeholder="Registered Email"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Log In
        </button>
        <p className="text-sm text-center">
          Not registered Seller? <a href="/seller/signup" className="text-blue-500">Signup</a>
        </p>
      </form>
    </div>
  );
}

