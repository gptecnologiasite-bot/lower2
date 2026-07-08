import React from 'react';

export default function Logo({ enabled, url, size, position }) {
  if (!enabled || !url) return null;

  return (
    <div 
      className={`logo-container logo-${position}`} 
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
    >
      <img src={url} alt="Logo" className="logo-image" />
    </div>
  );
}
