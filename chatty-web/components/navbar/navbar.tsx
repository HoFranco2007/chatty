"use client"

import { useState, useEffect, useRef } from "react";
import DeployableMenu from "./deployable-menu";
import NavigationMenuTrigger from "./deployable-menu"
import "./Navbar.css";
import { supabase } from "./supabase/serverClient";
import { AuthButtonServer } from "./supabase/auth-button-server";
import { supabaseClient } from "./supabase/clientClient";
import { type Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const Navbar = ({ 
  isOpen, 
  page,
  logged
} : {
  isOpen : boolean; 
  page : string;
  logged : boolean;
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(5);
  const [spanPosition, setSpanPosition] = useState({ left: 0, width: 0 });

  const router = useRouter();

  const navRefs = Array.from({ length: 5 }, () => useRef(null));

  useEffect(() => {
    const currentElement = navRefs[hoveredIndex]?.current;
    if (hoveredIndex !== null && currentElement) {
      const { offsetLeft, offsetWidth } = currentElement as unknown as HTMLElement;
      setSpanPosition({ left: offsetLeft, width: offsetWidth });
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignInGoogle = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  const handelSignOut = async () => {
    await supabaseClient.auth.signOut();
    router.refresh();
  };

  const handleMouseEnter = (index : number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(5);
    setSpanPosition({ left: 0, width: 0 });
  };

  return (
    <main className="top-0 overflow-hidden pb-[4vw]">
      <header
        className={`fixed flex flex-row items-center justify-around w-full ${
          scrolled
            ? "bg-[#202020]/60 border-b border-b-[#CCCCCC]/80 transition-all duration-1000 shadow-4xl"
            : " transition-all duration-1000 border-b-0 border-b-white/0"
        }`}
      >
        <nav className="flex flex-row items-center justify-between w-full px-8 z-[99999]">
          <ul className="list-none flex flex-row items-center my-1" id="nav-list">
            <div className="">
              <img src="/chatty-head.png" alt="logo" className="w-18 h-14 p-1 mr-2" />
            </div>
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
                {index === 1 ? <DeployableMenu /> : item}
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
          <div>
            {
              logged ? 
                <ul className="flex flex-row items-center">
                  <li className="mr-4 xl:mr-2" onClick={handleSignInGoogle}>
                    <p className="text-black transition-colors duration-500 font-medium text-sm px-4 py-2 bg-[#CCCCCC] rounded-md cursor-pointer hover:bg-white">
                      Sign Up
                    </p>
                  </li>
                  <li className="ml-4 xl:ml-2" onClick={handleSignInGoogle}>
                    <p className="text-white/70 transition-colors duration-500 font-medium text-sm px-4 py-2 bg-[#1d1c1c56] rounded-md border border-[#525050] cursor-pointer hover:bg-[#3C3C3C]/70">
                      Log In
                    </p>
                  </li>
                </ul>
                :
                <ul className="flex flex-row items-center">
                  <li className="mr-4 xl:mr-2" onClick={handleSignInGoogle}>
                    <p className="text-black transition-colors duration-500 font-medium text-sm px-4 py-2 bg-[#CCCCCC] rounded-md cursor-pointer hover:bg-white">
                      Sign Up
                    </p>
                  </li>
                  <li className="ml-4 xl:ml-2" onClick={handleSignInGoogle}>
                    <p className="text-white/70 transition-colors duration-500 font-medium text-sm px-4 py-2 bg-[#1d1c1c56] rounded-md border border-[#525050] cursor-pointer hover:bg-[#3C3C3C]/70">
                      Log In
                    </p>
                  </li>
                </ul>
            }
          </div>
        </nav>
      </header>
    </main>
  );
};

export default Navbar