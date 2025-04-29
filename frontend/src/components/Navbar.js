import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (user) {
        setIsLoggedIn(true);
        setUserRole(user.role);
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    };

    checkAuth(); // Run on initial mount

    // Listen for auth change events
    window.addEventListener('authChanged', checkAuth);

    // Clean up on unmount
    return () => window.removeEventListener('authChanged', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('buyerId');
    localStorage.removeItem('sellerId');
    window.dispatchEvent(new Event('authChanged'));
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <Link to="/" className="text-2xl font-bold text-indigo-600">BidNow</Link>
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-700 hover:text-indigo-500">Home</Link>
        <Link to="/auctions" className="text-gray-700 hover:text-indigo-500">Auctions</Link>
        <Link to="/create-auction" className="text-gray-700 hover:text-indigo-500">Add Auction</Link>

        {!isLoggedIn ? (
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className="text-gray-700 hover:text-indigo-500"
            >
              Login
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="py-1">
                  <Link to="/buyer/login" className="block px-4 py-2 text-gray-700 hover:bg-indigo-500 hover:text-white">
                    Login as Buyer
                  </Link>
                  <Link to="/seller/login" className="block px-4 py-2 text-gray-700 hover:bg-indigo-500 hover:text-white">
                    Login as Seller
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-500"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;







