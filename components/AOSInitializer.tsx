// components/AOSInitializer.tsx
'use client';

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSInitializer = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
       mirror: true, 
      offset: 100,
      easing: 'ease-out-cubic',
    });
    AOS.refresh(); 
  }, []);

  return null; // This component doesn't render anything
};

export default AOSInitializer;