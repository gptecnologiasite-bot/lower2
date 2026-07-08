import React, { useState, useEffect, useRef } from 'react';

export default function TypeWriter({ text, speed = 50, onComplete, enabled = true }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textRef = useRef(text);
  
  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      if (onComplete) onComplete();
      return;
    }
    
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    let timer;

    const type = () => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        timer = setTimeout(type, speed);
      } else {
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    };

    timer = setTimeout(type, speed);

    return () => clearTimeout(timer);
  }, [text, speed, enabled, onComplete]);

  return (
    <span className="typewriter-text">
      {displayedText}
      {isTyping && <span className="typewriter-cursor">|</span>}
    </span>
  );
}
