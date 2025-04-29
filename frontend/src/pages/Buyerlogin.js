import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BuyerLogin() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          emailOrUsername,
          password,
          role: "buyer",
        },
        {
          withCredentials: true,  // ✅ VERY IMPORTANT: so cookies are saved
        }
      );
  
      localStorage.setItem('user', JSON.stringify({ userId: res.data.userId, role: 'buyer' }));
      
      // 🔥 REMOVE this line because no token is coming in res.data
      // localStorage.setItem('authToken', res.data.token);

      localStorage.setItem('buyerId', res.data.userId);
      window.dispatchEvent(new Event('authChanged'));
  
      alert("Logged in as buyer");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Buyer Login</h2>
        <input
          type="text"
          placeholder="Email or Username"
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
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Log In
        </button>
        <p className="text-sm text-center">
          Not registered buyer? <a href="/buyer/signup" className="text-blue-500">Signup</a>
        </p>
      </form>
    </div>
  );
}
