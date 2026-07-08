import React, { useState, useEffect } from 'react';
import { useBroadcastChannel } from './hooks/useBroadcastChannel';
import { useLocalStorage } from './hooks/useLocalStorage';
import LowerThird from './components/LowerThird';

export default function App() {
  const [lowerThirds, setLowerThirds] = useLocalStorage('obs-lower-thirds-source-state', []);

  const handleMessage = (data) => {
    if (!data || !data.action) return;

    if (data.action === 'show') {
      setLowerThirds(prev => {
        const existing = prev.find(lt => lt.id === data.id);
        const newData = { ...data, visible: true, hiding: false };
        if (existing) {
          return prev.map(lt => lt.id === data.id ? newData : lt);
        }
        return [...prev, newData];
      });
    } else if (data.action === 'hide') {
      setLowerThirds(prev => {
        return prev.map(lt => {
          if (lt.id === data.id) {
            return { ...lt, hiding: true };
          }
          return lt;
        });
      });

      // After animation out, remove it
      const duration = (data.animOut || 1) * 1000;
      setTimeout(() => {
        setLowerThirds(prev => prev.filter(lt => lt.id !== data.id));
      }, duration);
    }
  };

  useBroadcastChannel('obs-lower-thirds-control', handleMessage);

  return (
    <>
      {lowerThirds.map(lt => (
        <LowerThird key={lt.id} data={lt} />
      ))}
    </>
  );
}
