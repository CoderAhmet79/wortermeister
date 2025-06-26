import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const usePageTimer = () => {
  const location = useLocation();
  const [startTime, setStartTime] = useState(Date.now());
  const [scrollDepth, setScrollDepth] = useState(0);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);

  // Collect device and browser information
  useEffect(() => {
    const device = {
      type: navigator.userAgent.includes("Mobi") ? "Mobile" : "Desktop",
      os: getOS(),
      browser: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
    };
    setDeviceInfo(device);

    // Fetch IP and location info
    const fetchLocationData = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        setIpAddress(response.data.ip);
        setCountry(response.data.country_name);
        setCity(response.data.city);
      } catch (error) {
        console.error("Error fetching IP data:", error);
      }
    };

    fetchLocationData();
  }, []);

  const getOS = () => {
    if (navigator.userAgentData && navigator.userAgentData.platform) {
      return navigator.userAgentData.platform; // Modern method
    }
  
    const userAgent = navigator.userAgent;
    if (/Windows/i.test(userAgent)) return "Windows";
    if (/Mac/i.test(userAgent)) return "macOS";
    if (/Linux/i.test(userAgent)) return "Linux";
    if (/Android/i.test(userAgent)) return "Android";
    if (/iPhone|iPad|iPod/i.test(userAgent)) return "iOS";
    return "Unknown";
  };
  

  // Track scroll depth
  const handleScroll = () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    setScrollDepth(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to send tracking data
  const sendTrackingData = async () => {
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000); // Convert to seconds

    if (duration > 0) {
      const data = {
        page: location.pathname,
        timeSpent: duration,
        sessionDuration: duration,
        scrollDepth,
        deviceInfo,
        userId,
        ipAddress,
        country,
        city,
        timestamp: new Date().toISOString(),
      };

      // try {
      //   // Use navigator.sendBeacon for reliability on unload
      //  console.log(data)
      //   await axios.post(process.env.REACT_APP_URI + 'tracks', data, {
      //       withCredentials: true, // Ensure credentials (cookies) are included
      //     });
      //   console.log(`📊 Final tracking data sent: ${duration} seconds on ${location.pathname}`);
      // } catch (error) {
      //   console.error("❌ Error sending tracking data:", error);
      // }
    }
  };

  // Ensure data is sent when user **fully** leaves the page
  useEffect(() => {
    window.addEventListener("beforeunload", sendTrackingData);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        sendTrackingData();
      }
    });

    return () => {
      sendTrackingData();
      window.removeEventListener("beforeunload", sendTrackingData);
      document.removeEventListener("visibilitychange", sendTrackingData);
      setStartTime(Date.now()); // Reset timer for new page
    };
  }, [location, scrollDepth, deviceInfo, userId, ipAddress, country, city]);

  return null;
};

export default usePageTimer;
