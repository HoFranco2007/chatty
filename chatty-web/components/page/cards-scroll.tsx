"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { img } from 'framer-motion/client';

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    balance: "$805,428.51",
    img: "/chrome-web-store.png",
    heading: "Search in chrome webstore",
    subtext: "Fund your account by raising capital or transferring funds from an external account.",
  },
  {
    balance: "$300,000.00",
    img: "/chatty-extension.png",
    heading: "Deploy in seconds",
    subtext: "Use the funds to invest in opportunities and watch your balance grow.",
  },
  {
    balance: "$1,000,000.00",
    img: "/chatbot-github.png",
    heading: "Ready to use",
    subtext: "Your investments have paid off, and your account is thriving.",
  },
];

const ScrollCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const sections = cardData.length;

    ScrollTrigger.create({
      trigger: cardRef.current,
      start: "0 center",
      end: () => `+=${window.innerHeight * (sections - 1.3)}`,
      scrub: true,
      pin: cardRef.current,
      onUpdate: (self) => {
        const scrollIndex = Math.floor(self.progress * (sections - 0.5));
        setCurrentIndex(scrollIndex);
      },
    });

    ScrollTrigger.create({
      trigger: textRef.current,
      start: "-100 center",
      end: () => `+=${window.innerHeight * (sections - 1.3)}`, 
      scrub: true,
      pin: textRef.current,
    });

    ScrollTrigger.create({
      trigger: titleRef.current,
      start: "80 200",
      end: () => `+=${window.innerHeight * (sections - 1.3)}`, 
      scrub: true,
      pin: titleRef.current,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="h-[250vh] w-[100vw] flex items-start justify-center bg-[#0e0e0e] border-t border-[#CCCCCC]">
      <div className="relative flex flex-col items-center justify-center">
        <div 
          ref={titleRef}
          className='w-[100vw] flex justify-center items-center'
          >
            <h1 className='text-white mb-[4vh] text-[6vw] mt-[3vh]'>click, click, done</h1>
        </div>
        <div className="relative flex flex-row items-end justify-center">
          <div
            ref={cardRef}
            className="w-[40vw] h-[40vh] p-8 bg-white rounded-lg shadow-lg flex justify-center items-center"
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className=""
              >
                <div className="">
                  <img src={cardData[currentIndex].img} alt="" className='w-[50vw] max-h-[34vh]' />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            ref={textRef}
            className="mt-12 ml-12 w-[30vw] text-white"
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className=""
              >
                <h1 className="text-4xl font-bold mb-4">{cardData[currentIndex].heading}</h1>
                <p className="text-lg text-gray-400">{cardData[currentIndex].subtext}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollCard;
