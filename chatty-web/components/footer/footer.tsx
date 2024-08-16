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
        <section className="">
            <nav id="">
                <ul className="list-none flex flex-row items-center my-1" id="nav-list">
                {["Home", "", "Service", "Products", "Contact Us"].map((item, index) => (
                    <li
                    key={index}
                    ref={navRefs[index]}
                    className={`text-white/70 text-sm cursor-pointer ${
                        hoveredIndex === index ? "text-white/70 hover:text-white" : ""} ${
                        index !== 1 ? "p-[1.5vw]" : ""}`
                    }
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    >
                    {index === 1 ? "" : item}
                    </li>
                ))}
                {hoveredIndex !== null && (
                    <span
                    className="transition-all duration-200 mt-1"
                    style={{
                        left: `${spanPosition.left + 5}px`,
                        width: `${spanPosition.width - 10}px`,
                        position: "absolute",
                        opacity: hoveredIndex === 5 ? 0 : 0.2,
                    }}
                    ></span>
                )}
                </ul>
            </nav>
        </section>
    )
}

export default Footer