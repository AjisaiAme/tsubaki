import React from 'react';
import Card from './featureCard.jsx';

const cardData = [
    {
      id: 1,
      title: 'Track',
      description: 'Effortlessly keep track of your anime and manga progress.',
      imageUrl: <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-journal-bookmark" viewBox="0 0 16 16" id="Journal-Bookmark--Streamline-Bootstrap"><desc>Journal Bookmark Streamline Icon: https://streamlinehq.com</desc><path fill-rule="evenodd" d="M6 8V1h1v6.117L8.743 6.07a0.5 0.5 0 0 1 0.514 0L11 7.117V1h1v7a0.5 0.5 0 0 1 -0.757 0.429L9 7.083 6.757 8.43A0.5 0.5 0 0 1 6 8" stroke-width="1"></path><path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2H3a2 2 0 0 1 -2 -2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1 -1V2a1 1 0 0 0 -1 -1H3a1 1 0 0 0 -1 1v1H1V2a2 2 0 0 1 2 -2" stroke-width="1"></path><path d="M1 5v-0.5a0.5 0.5 0 0 1 1 0V5h0.5a0.5 0.5 0 0 1 0 1h-2a0.5 0.5 0 0 1 0 -1zm0 3v-0.5a0.5 0.5 0 0 1 1 0V8h0.5a0.5 0.5 0 0 1 0 1h-2a0.5 0.5 0 0 1 0 -1zm0 3v-0.5a0.5 0.5 0 0 1 1 0v0.5h0.5a0.5 0.5 0 0 1 0 1h-2a0.5 0.5 0 0 1 0 -1z" stroke-width="1"></path></svg>,
    },
    {
      id: 2,
      title: 'Discover',
      description: 'Explore new genres, trending titles, and hidden gems tailored just for you.',
      imageUrl: <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-search-heart" viewBox="0 0 16 16" id="Search-Heart--Streamline-Bootstrap"><desc>Search Heart Streamline Icon: https://streamlinehq.com</desc><path d="M6.5 4.482c1.664 -1.673 5.825 1.254 0 5.018 -5.825 -3.764 -1.664 -6.69 0 -5.018" stroke-width="1"></path><path d="M13 6.5a6.47 6.47 0 0 1 -1.258 3.844q0.06 0.044 0.115 0.098l3.85 3.85a1 1 0 0 1 -1.414 1.415l-3.85 -3.85a1 1 0 0 1 -0.1 -0.115h0.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0 -11 5.5 5.5 0 0 0 0 11" stroke-width="1"></path></svg>,
    },
    {
      id: 3,
      title: 'Explore',
      description: 'Unlock detailed insights into your anime and manga journey.',
      imageUrl: <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-binoculars" viewBox="0 0 16 16" id="Binoculars--Streamline-Bootstrap"><desc>Binoculars Streamline Icon: https://streamlinehq.com</desc><path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a0.5 0.5 0 0 0 0.276 0.447l0.895 0.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1 -1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a0.5 0.5 0 0 1 0.146 -0.354l0.854 -0.853V9.5a0.5 0.5 0 0 0 -0.5 -0.5h-3a0.5 0.5 0 0 0 -0.5 0.5v0.793l0.854 0.853A0.5 0.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 0.83 -1.342l0.894 -0.447A0.5 0.5 0 0 0 3 4.882zM4.5 2a0.5 0.5 0 0 0 -0.5 0.5V3h2v-0.5a0.5 0.5 0 0 0 -0.5 -0.5zM6 4H4v0.882a1.5 1.5 0 0 1 -0.83 1.342l-0.894 0.447A0.5 0.5 0 0 0 2 7.118V13h4v-1.293l-0.854 -0.853A0.5 0.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a0.5 0.5 0 0 1 -0.146 0.354l-0.854 0.853V13h4V7.118a0.5 0.5 0 0 0 -0.276 -0.447l-0.895 -0.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a0.5 0.5 0 0 1 -0.5 0.5h-3a0.5 0.5 0 0 1 -0.5 -0.5zm4 -1h2v-0.5a0.5 0.5 0 0 0 -0.5 -0.5h-1a0.5 0.5 0 0 0 -0.5 0.5zm4 11h-4v0.5a0.5 0.5 0 0 0 0.5 0.5h3a0.5 0.5 0 0 0 0.5 -0.5zm-8 0H2v0.5a0.5 0.5 0 0 0 0.5 0.5h3a0.5 0.5 0 0 0 0.5 -0.5z" stroke-width="1"></path></svg>,
    },
    {
      id: 4,
      title: 'AI Chatbot',
      description: 'Interact with Miyako to manage your lists and get recommendations using natural language commands.',
      imageUrl: <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-chat-dots" viewBox="0 0 16 16" id="Chat-Dots--Streamline-Bootstrap"><desc>Chat Dots Streamline Icon: https://streamlinehq.com</desc><path d="M5 8a1 1 0 1 1 -2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1 -2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0 -2 1 1 0 0 0 0 2" stroke-width="1"></path><path d="m2.165 15.803 0.02 -0.004c1.83 -0.363 2.948 -0.842 3.468 -1.105A9 9 0 0 0 8 15c4.418 0 8 -3.134 8 -7s-3.582 -7 -8 -7 -8 3.134 -8 7c0 1.76 0.743 3.37 1.97 4.6a10.4 10.4 0 0 1 -0.524 2.318l-0.003 0.011a11 11 0 0 1 -0.244 0.637c-0.079 0.186 0.074 0.394 0.273 0.362a22 22 0 0 0 0.693 -0.125m0.8 -3.108a1 1 0 0 0 -0.287 -0.801C1.618 10.83 1 9.468 1 8c0 -3.192 3.004 -6 7 -6s7 2.808 7 6 -3.004 6 -7 6a8 8 0 0 1 -2.088 -0.272 1 1 0 0 0 -0.711 0.074c-0.387 0.196 -1.24 0.57 -2.634 0.893a11 11 0 0 0 0.398 -2" stroke-width="1"></path></svg>,
    },
    {
      id: 5,
      title: 'Dashboard',
      description: 'A personalized dashboard with detailed statistics and interactive data visualizations to track your progress.',
      imageUrl: <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-window-sidebar" viewBox="0 0 16 16" id="Window-Sidebar--Streamline-Bootstrap"><desc>Window Sidebar Streamline Icon: https://streamlinehq.com</desc><path d="M2.5 4a0.5 0.5 0 1 0 0 -1 0.5 0.5 0 0 0 0 1m2 -0.5a0.5 0.5 0 1 1 -1 0 0.5 0.5 0 0 1 1 0m1 0.5a0.5 0.5 0 1 0 0 -1 0.5 0.5 0 0 0 0 1" stroke-width="1"></path><path d="M2 1a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2V3a2 2 0 0 0 -2 -2zm12 1a1 1 0 0 1 1 1v2H1V3a1 1 0 0 1 1 -1zM1 13V6h4v8H2a1 1 0 0 1 -1 -1m5 1V6h9v7a1 1 0 0 1 -1 1z" stroke-width="1"></path></svg>,
    },
    {
      id: 6,
      title: 'Responsive UI',
      description: 'Enjoy a smooth and responsive user experience optimized for both desktop and mobile devices.',
      imageUrl: <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-ui-checks-grid" viewBox="0 0 16 16" id="Ui-Checks-Grid--Streamline-Bootstrap"><desc>Ui Checks Grid Streamline Icon: https://streamlinehq.com</desc><path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1H2a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1m9 -9h3a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1V2a1 1 0 0 1 1 -1m0 9a1 1 0 0 0 -1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1 -1v-3a1 1 0 0 0 -1 -1zm0 -10a2 2 0 0 0 -2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2zM2 9a2 2 0 0 0 -2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2 -2v-3a2 2 0 0 0 -2 -2zm7 2a2 2 0 0 1 2 -2h3a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-3a2 2 0 0 1 -2 -2zM0 2a2 2 0 0 1 2 -2h3a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2H2a2 2 0 0 1 -2 -2zm5.354 0.854a0.5 0.5 0 1 0 -0.708 -0.708L3 3.793l-0.646 -0.647a0.5 0.5 0 1 0 -0.708 0.708l1 1a0.5 0.5 0 0 0 0.708 0z" stroke-width="1"></path></svg>,
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