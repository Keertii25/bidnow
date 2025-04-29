import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: 'Typewriters',
      slug: 'typewriters',
      image: 'https://typewriterreview.com/wp-content/uploads/2021/01/hermes-3000-1.jpeg',
    },
    {
      name: 'Antiques',
      slug: 'antiques',
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Automobiles',
      slug: 'automobiles',
      image: 'https://www.mozaweb.com/en/mozaik3D/FOL/tarsadalom/gepkocsik_fejlodese/960.jpg',
    },
    {
      name: 'Books',
      slug: 'books',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Art',
      slug: 'art',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Furniture',
      slug: 'furniture',
      image: 'https://media.designcafe.com/wp-content/uploads/2019/12/17054440/living-room-furniture-design-for-your-home-768x768.jpg',
    },
  ];

  const handleClick = (slug) => {
    navigate(`/auctions/category/${slug}`);
  };

  return (
    <div className="my-8 px-4">
      <h2 className="text-2xl text-center font-medium mb-4">Browse by Category</h2>
      <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => handleClick(cat.slug)}
            className="min-w-[356px] min-h-[300px] p-3 bg-gray-50 rounded-sm shadow cursor-pointer hover:bg-gray-200 transition"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-64 object-cover rounded-sm mb-2"
            />
            <p className="text-lg font-normal text-center">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
