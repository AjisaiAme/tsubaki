import React from 'react';

const FeatureCard = ({ title, description, imageUrl }) => (
  <div className='card'>
    <h3 className='card-title'>{title}</h3>
    <p className='card-description'>{description}</p>
    {/*<img src={imageUrl} alt={title} className='card-image' />*/}
  </div>
);

export default FeatureCard;
