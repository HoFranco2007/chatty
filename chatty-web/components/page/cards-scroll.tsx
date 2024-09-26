"use client"

import { transform } from 'next/dist/build/swc';
import React from 'react';
import { useState, useEffect } from 'react';

const ScrollCards = () => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (scrollPosition < 1000 || scrollPosition >= 3000) {
        setActiveCard(0);
      } else if (scrollPosition >= 1000 && scrollPosition < 1800) {
        setActiveCard(1);
      }else if (scrollPosition >= 1800 && scrollPosition < 2400) {
        setActiveCard(2);
      } else if (scrollPosition >= 3200) {
        setActiveCard(3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
     <section className='relative h-[320vh] bg-black'>
         <div className={`${activeCard === 1 || 2 || 3 ? "fixed top-[60%] left-[50%] -translate-x-[50%] -translate-y-[50%] transition-all duration-300 grid grid-rows-3 grid-cols-2 h-[100vh] w-[100vw] pl-[6vw] py-[8vh] pb-[16vh] gap-[16vw]" : 'hidden'}`}>
             <aside className={`row-span-3 col-span-1  rounded-2xl flex items-center justify-center transition-all duration-500 ${activeCard === 0 ? "bg-transparent -z-50" : "bg-white" }`}>
                
             </aside>
         </div>
     </section>
  );
};

export default ScrollCards;