import React, { useState, useEffect } from 'react';
import home3 from '../assets/home3.jpg'

const images = [
    'https://cdn.supplyon.com/wp-content/uploads/2020/03/Online-Auctions_blog-1.jpg',
  'https://typewriterreview.com/wp-content/uploads/2021/01/hermes-3000-1.jpeg',
  home3
]

const Carousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-screen h-full: overflow-hidden relative px-2">
      <img
        src={images[index]}
        alt="carousel"
        className="w-full h-[600px] object-cover transition-all duration-700"
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${index === i ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
