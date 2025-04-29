import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center mt-10">
      <p>&copy; {new Date().getFullYear()} BidNow. All rights reserved.</p>
    </footer>
  );
};

export default Footer;