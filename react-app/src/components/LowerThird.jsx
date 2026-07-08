import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import TypeWriter from './TypeWriter';
import '../styles/animations.css';
import '../styles/lowerThird.css';

export default function LowerThird({ data }) {
  const {
    visible,
    hiding,
    name,
    info,
    transition = 'slide',
    animIn = 1,
    animOut = 1,
    background = 'rgba(255, 255, 255, 0.1)',
    typewriter = false,
    fontFamily = 'Montserrat',
    nameSize = 32,
    titleSize = 20,
    nameColor = '#ffffff',
    titleColor = '#fbbf24',
    logoEnabled = false,
    logoUrl = '',
    logoSize = 60,
    logoPosition = 'left'
  } = data;

  if (!visible && !hiding) return null;

  const animationClass = hiding ? `animation-out transition-${transition}` : `animation-in transition-${transition}`;
  
  return (
    <div 
      className={`lower-third ${animationClass}`}
      style={{
        '--anim-in-duration': `${animIn}s`,
        '--anim-out-duration': `${animOut}s`
      }}
    >
      <Logo 
        enabled={logoEnabled} 
        url={logoUrl} 
        size={logoSize} 
        position={logoPosition} 
      />
      
      <div 
        className="content-box" 
        style={{ background: background }}
      >
        <div 
          className="name"
          style={{
            fontFamily: fontFamily,
            fontSize: `${nameSize}px`,
            color: nameColor
          }}
        >
          <TypeWriter 
            text={name} 
            speed={50} 
            enabled={typewriter && !hiding} 
          />
        </div>
        <div 
          className="info"
          style={{
            fontSize: `${titleSize}px`,
            color: titleColor
          }}
        >
          <TypeWriter 
            text={info} 
            speed={50} 
            enabled={typewriter && !hiding} 
          />
        </div>
      </div>
    </div>
  );
}
