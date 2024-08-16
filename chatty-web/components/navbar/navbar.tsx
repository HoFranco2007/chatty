"use client"

import { useState, useEffect, useRef } from "react";
import DeployableMenu from "./deployable-menu";
import "./Navbar.css";
import { supabase } from "./supabase/serverClient";
import { AuthButtonServer } from "./supabase/auth-button-server";
import { supabaseClient } from "./supabase/clientClient";
import { type Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Settings from "./settings"

const Navbar = ({ 
  logged
} : {
  logged : boolean;
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(5);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [spanPosition, setSpanPosition] = useState({ left: 0, width: 0 });
  const [asideTop, setAsideTop] = useState(0); 
  

  const router = useRouter();
  const navRef = useRef(null);
  const navRefs = Array.from({ length: 5 }, () => useRef(null));

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

  const handleOpenNavbar = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth < 1200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      const navHeight = (navRef.current as HTMLElement).offsetHeight;
      setAsideTop(navHeight); 
    }
  }, [scrolled, isBurgerOpen]);


  const handleMouseEnter = (index : number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(5);
    setSpanPosition({ left: 0, width: 0 });
  };

  return (
    <header className={`top-0 overflow-x-hidden ${ smallScreen ? "pb-[4vw]" : "pb-[2.5vw]"}`}>
      {smallScreen ? (
        <nav 
          className={`fixed z-20 flex flex-row items-center justify-between w-[100vw] transition-all border-b 
                      ${isBurgerOpen || scrolled ? "bg-black border-b border-[#CCCCCC] duration-1000" : "border-[#CCCCCC]/0 duration-200"}`}
          ref={navRef}
        >
          <ul className="flex flex-row items-center justify-between w-[100vw] px-6 py-2">
            <li>
              <div className="">
                <img src="/chatty-head.png" alt="logo" className="w-18 h-14 p-1 mr-2" />
              </div>
            </li>
            <li>
              <button
                onClick={handleOpenNavbar}
                className="bg-none border-0 cursor-pointer w-[60px] h-[60px] p-0"
              >
                <span
                  className={`rounded-[5px] bg-white/70 block w-[40%] mt-[5px] mb-[auto] h-[2px] transition-all duration-700 ${
                    isBurgerOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                ></span>
                <span
                  className={`rounded-[5px] block w-[40%] mt-[5px] mb-[auto] h-[2px] transition-all duration-500 ${
                    isBurgerOpen
                      ? "bg-none bg-transparent"
                      : "bg-white/70 duration-1000"
                  }`}
                ></span>
                <span
                  className={`rounded-[5px] bg-white/70 block w-[40%] mt-[5px] mb-[auto] h-[2px] transition-all duration-700 ${
                    isBurgerOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                ></span>
              </button>
            </li>
          </ul>
          <aside 
            className={`fixed transition-all w-[20vw] h-[200vh] z-10 ${ isBurgerOpen ? "right-[0vw] bg-black border-l border-[#CCCCCC] duration-500" : "right-[-20vw] border-[#CCCCCC]/0 duration-300"}`}
            style={{ top: `${asideTop - 0.5}px` }} 
          >
            <section className="flex flex-col items-center justify-between h-[80vh] w-full">
              <ul className="list-none flex flex-col items-center" id="nav-list">
                {["Home", "", "Service", "Products", "Contact Us"].map((item, index) => (
                  <li
                    key={index}
                    ref={navRefs[index]}
                    className={`text-white/70 text-sm cursor-pointer mx-1 ${
                      hoveredIndex === index ? "text-white/70 hover:text-white" : ""} ${
                      index !== 1 ? "p-[1.5vw]" : ""}`
                    }
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {index === 5 ? "" : item}
                  </li>
                ))}
              </ul>
              <div>
                { logged ? (
                    <ul className="flex flex-col items-center">
                      <li className="" onClick={handleSignInGoogle}>
                        <p className="text-white/70 transition-colors duration-500 font-medium text-sm px-2 py-2 cursor-pointer hover:text-white">
                          Shai Gilgeous-Alexander
                        </p>
                      </li>
                      <div className="flex flex-row items-center p-2">
                        <li className="px-2" onClick={handleSignInGoogle}>
                          <img className="rounded-full w-[2.5vw] border border-[#CCCCCC]/40 cursor-pointer" src="/profile.png" alt="pedro" />
                        </li>
                        <li className="mx-2">
                            <Settings/>
                        </li>
                      </div>
                    </ul>
                  ) : (
                    <ul className="flex flex-col items-center">
                      <li className="mb-2" onClick={handleSignInGoogle}>
                        <p className="text-white/70 transition-colors duration-500 font-medium text-sm px-4 py-2 bg-[#1d1c1c56] rounded-md border border-[#525050] cursor-pointer hover:bg-[#3C3C3C]/70">
                          Log In
                        </p>
                      </li>
                      <li className="mt-2" onClick={handleSignInGoogle}>
                        <p className="text-black transition-colors duration-500 font-medium text-sm px-4 py-2 bg-[#CCCCCC] rounded-md cursor-pointer hover:bg-white">
                          Sign Up
                        </p>
                      </li>
                    </ul>
                )}
              </div>
            </section>
          </aside>
        </nav>
      ) : (
        <nav
          className={` fixed flex flex-row items-center justify-around w-[100vw] ${
            scrolled
              ? "bg-[#202020]/60 border-b border-b-[#CCCCCC]/80 transition-all duration-1000 shadow-4xl"
              : " transition-all duration-1000 border-b-0 border-b-white/0"
          }`}
        >
          <aside className="flex flex-row items-center justify-between w-full px-[2vw]">
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
              { logged ? (
                  <ul className="flex flex-row items-center">
                    <li className="" onClick={handleSignInGoogle}>
                      <p className="text-white/70 transition-colors duration-500 font-medium text-sm px-2 py-2 cursor-pointer hover:text-white">
                        Shai Gilgeous-Alexander
                      </p>
                    </li>
                    <li className="px-2" onClick={handleSignInGoogle}>
                      <img className="rounded-full w-[2.5vw] border border-[#CCCCCC]/40 cursor-pointer" src="/profile.png" alt="pedro" />
                    </li>
                    <li className="mx-2">
                        <Settings/>
                    </li>
                  </ul>
                ) : (
                  <ul className="flex flex-row items-center mr-4">
                    <li className="mr-2" onClick={handleSignInGoogle}>
                      <p className="text-black transition-colors duration-500 font-medium text-sm px-4 py-2 bg-[#CCCCCC] rounded-md cursor-pointer hover:bg-white">
                        Sign Up
                      </p>
                    </li>
                    <li className="ml-2" onClick={handleSignInGoogle}>
                      <p className="text-white/70 transition-colors duration-500 font-medium text-sm px-4 py-2 bg-[#1d1c1c56] rounded-md border border-[#525050] cursor-pointer hover:bg-[#3C3C3C]/70">
                        Log In
                      </p>
                    </li>
                  </ul>
              )}
            </div>
          </aside>
        </nav>
      )};
    </header>
  )}

export default Navbar