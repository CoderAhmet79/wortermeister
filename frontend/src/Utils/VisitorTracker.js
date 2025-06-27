import { useEffect } from 'react';
import axios from 'axios';

const VisitorTracker = () => {
  useEffect(() => {
    const collectData = async () => {
      const data = {
        language: navigator.language,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        currentUrl: window.location.href,
        timestamp: new Date().toISOString(),
      };

      try {
        await axios.post(`${process.env.REACT_APP_URI}visitors`, data);
      } catch (err) {
        console.error('Visitor log failed', err);
      }
    };

    collectData();
  }, []);

  return null;
};

export default VisitorTracker;