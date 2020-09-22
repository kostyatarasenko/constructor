import React from 'react';

const Card = ({ className, onClick, children }) => (
  <div
    onClick={onClick}
    className={`card ${className}`}
  >
    {children}
  </div>
);

export default Card;
