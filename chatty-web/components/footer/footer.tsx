"use client"

import { useState, useEffect, useRef } from "react";
import "./footer.css"

const Footer = () => {
    const navRef = useRef(null);
    const navRefs = Array.from({ length: 5 }, () => useRef(null));
    const [hoveredIndex, setHoveredIndex] = useState(5);
    const [spanPosition, setSpanPosition] = useState({ left: 0, width: 0 });

    useEffect(() => {
        const currentElement = navRefs[hoveredIndex]?.current;
        if (hoveredIndex !== null && currentElement) {
          const { offsetLeft, offsetWidth } = currentElement as unknown as HTMLElement;
          setSpanPosition({ left: offsetLeft, width: offsetWidth });
        }
      }, [hoveredIndex]);

      const handleMouseEnter = (index : number) => {
        setHoveredIndex(index);
      };
    
      const handleMouseLeave = () => {
        setHoveredIndex(5);
        setSpanPosition({ left: 0, width: 0 });
      };

    return(
        <section className="bottom-0 flex justify-end items-end">
            <nav className="h-[35vh] bottom-0 flex justify-center items-baseline border-t border-[#CCCCCC]/80 w-[100vw] bg-black" id="">
                <div className="flex flex-col justify-center items-center w-[100vw]">
                    <ul className="h-[10vh] bottom-0 flex flex-row items-center my-[1vh]" id="nav-list">
                    {["Home", "", "Service", "Products", "Contact Us"].map((item, index) => (
                        <li
                        key={index}
                        ref={navRefs[index]}
                        className={`text-white/70 text-[1.2vw] cursor-pointer ${
                            hoveredIndex === index ? "text-white/70 hover:text-white" : ""} ${
                            index !== 1 ? "py-[2vh] px-[2vw] mx-[1vw]" : ""}`
                        }
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        >
                        {index === 1 ? "" : item}
                        </li>
                    ))}
                    {hoveredIndex !== null && (
                        <span
                        className="transition-all duration-1000 mt-1"
                        style={{
                            left: `${spanPosition.left + 5}px`,
                            width: `${spanPosition.width - 10}px`,
                            position: "absolute",
                            opacity: hoveredIndex === 5 ? 0 : 0.2,
                            height: "25px",
                        }}
                        ></span>
                    )}
                    </ul>
                    <div className="flex justify-center items-center flex-col pb-[3vh]">
                        <h4 className="text-[#CCCCCC] text-[1.5vw] font-bold">Download our Extension</h4>
                        <img className="w-[14vw]" src="/chrome-web-store.png" alt="" />
                    </div>
                    <div>
                        <hr className="h-[1px] w-[100vw]"/>
                    </div>
                    <div className="flex flex-row justify-between w-[100vw] h-8 px-[2vw] bg-black">
                        <ul className="flex flex-row justify-center items-center">
                            <li className="text-[#CCCCCC]/80 text-[1vw] mx-[1vw] hover:text-white cursor-pointer">Terms</li>
                            <li className="text-[#CCCCCC]/80 text-[1vw] mx-[1vw] hover:text-white cursor-pointer">Privacy</li>
                            <li className="text-[#CCCCCC]/80 text-[1vw] mx-[1vw] hover:text-white cursor-pointer">Conditions</li>
                        </ul>
                        <div className="flex flex-row items-center justify-center">
                            <img className="w-[15px] h-[15px] mx-[.5vw] cursor-pointer" src="/icons/YouTube.png" alt="" />
                            <img className="w-[15px] h-[15px] mx-[.5vw] cursor-pointer" src="/icons/Instagram.png" alt="" />
                        </div>
                    </div>
                </div>
            </nav>
        </section>
    )
}

export default Footer