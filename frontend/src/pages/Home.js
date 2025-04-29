import React from 'react';
import Carousel from '../components/Carousel';
import CategorySection from '../components/CategorySection';
import FeaturedAuctions from '../components/featuredauction';

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Carousel />
      <CategorySection />
      <FeaturedAuctions/>
      {/* Auction categories and live auctions will go below */}
    </div>
  );
};

export default Home;
