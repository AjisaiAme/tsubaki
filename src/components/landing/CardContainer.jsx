import React from 'react';
import Card from './featureCard.jsx';

const cardData = [
    {
      id: 1,
      title: 'Track',
      description: 'Effortlessly keep track of your anime and manga progress. Log episodes, update your watchlist, and never lose your place in your favorite series.',
      imageUrl: 'path/to/image1.jpg',
    },
    {
      id: 2,
      title: 'Discover',
      description: 'Explore new genres, trending titles, and hidden gems tailored just for you.',
      imageUrl: 'path/to/image2.jpg',
    },
    {
      id: 3,
      title: 'Dive Deeper',
      description: 'Unlock detailed insights into your anime and manga journey.',
      imageUrl: 'path/to/image3.jpg',
    },
    {
      id: 4,
      title: 'AI Chatbot',
      description: 'Interact with “Miyako” to manage your lists and get recommendations using natural language commands.',
      imageUrl: 'path/to/image5.jpg',
    },
    {
      id: 5,
      title: 'Dashboard',
      description: 'A personalized dashboard with detailed statistics and interactive data visualizations to track your progress.',
      imageUrl: 'path/to/image7.jpg',
    },
    {
      id: 6,
      title: 'Responsive UI',
      description: 'Enjoy a smooth and responsive user experience optimized for both desktop and mobile devices.',
      imageUrl: 'path/to/image8.jpg',
    }
  ];
  
const FeatureCardContainer = () => (
  <div className='feature-card-container'>
    <div className='feature-items'>
      {cardData.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
        />
      ))}
    </div>
  </div>
);

export default FeatureCardContainer;