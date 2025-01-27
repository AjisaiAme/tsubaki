import React from 'react';

const FeatureCard = ({ title, description, imageUrl }) => (
  <div className='card'>
    <div className='card-image'>
      {typeof imageUrl === 'string' ? <img src={imageUrl} alt={title} /> : imageUrl}
    </div>
    <h3 className='card-title'>{title}</h3>
    <p className='card-description'>{description}</p>
  </div>
);

export default FeatureCard;
