import { useEffect, useRef } from 'react';

export function useBroadcastChannel(channelName, onMessage) {
  const channelRef = useRef(null);
  
  // Store the latest onMessage callback so we don't need to re-bind the channel listener on every render
  const onMessageRef = useRef(onMessage);
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    channelRef.current = new BroadcastChannel(channelName);
    
    channelRef.current.onmessage = (event) => {
      if (onMessageRef.current) {
        onMessageRef.current(event.data);
      }
    };

    return () => {
      if (channelRef.current) {
        channelRef.current.close();
      }
    };
  }, [channelName]);

  return channelRef.current;
}
