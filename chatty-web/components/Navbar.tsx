"use client"

import { useState, useEffect } from "react";
import DeployableMenu from "./deployable-menu";
import NavigationMenuTrigger from "./deployable-menu"
import "./Navbar.css";
import { supabase } from "../components/supabase/serverClient";
import { AuthButtonServer } from "../components/supabase/auth-button-server";
import { supabaseClient } from "../components/supabase/clientClient";
import { type Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const Navbar = ({isOpen, page} : {isOpen : boolean; page : string}) => {
  const [scrolled, setScrolled] = useState(false);
  const [smallScreen, setSmallScreen] = useState();
  const [hoveredIndex, setHoveredIndex] = useState(5);

  const router = useRouter()

  const handleSignInGoogle = async () => {
    await supabaseClient.auth.signInWithOAuth({
        provider:"google",
        options: {
            redirectTo: "http://localhost:3000/auth/callback"
        }
    })
  }
  const handelSignOut = async () => {
      await supabaseClient.auth.signOut()
      router.refresh()
  }

  const handleMouseEnter = (index : number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(5);
  };
  return (
    <main className="top-0 overflow-hidden pb-36">
          <header className={`fixed flex flex-row items-center justify-around w-full mb-32 ${ scrolled ? "bg-none border-b border-b-white transition-all duration-1000 shadow-4xl" : " transition-all duration-1000 border-b-0 border-b-white/0"}`}>
            <nav className="flex flex-row items-center justify-between w-full px-8">
              <ul className="list-none flex flex-row items-center mt-2" id="nav-list">
                <div className="">
                  <img src="/chatty-head.png" alt="logo" className="w-18 h-14 p-1 mr-2" />
                </div>
                {Array.from({ length: 4 }, (_, index) => (
                  <li
                    key={index}
                    className={` text-white/70 text-sm cursor-pointer px-8 py-6${
                      hoveredIndex === index ? 'text-white/70 hover:text-white' : ''
                    }`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {index === 0 ? 'Home' : index === 1 ? 'Best Sellers' : index === 2 ? 'Services' : index === 3 ? 'Contact Us' : ""}
                  </li>
                ))}
              <li
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
              >
                <DeployableMenu />
              </li>
              {hoveredIndex !== null && (
                <span
                  className="transition-all duration-200 mt-1"
                  style={{
                    transform: `translateX(${hoveredIndex === 0 ? '5.1vw' : hoveredIndex === 1 ? '10.4vw' : hoveredIndex === 2 ? '17.4vw' : hoveredIndex === 3 ? '23.5vw' : hoveredIndex === 4 ? '29.6vw' : hoveredIndex == 5 ? '5.1vw' : ""})`,
                    transition: '0.3s ease', 
                    display: 'inline-block', 
                    position: 'absolute',
                    width: `${hoveredIndex === 0 ? '80px' : hoveredIndex === 1 ? '110px' : hoveredIndex === 2 ? '90px' : hoveredIndex === 3 ? '100px' : hoveredIndex === 4 ? '135px' : hoveredIndex === 5 ? '0px' : ""}`,
                  }}
              ></span>  
            )}
            </ul>
              <div>
                <ul className="flex flex-row items-center">
                  <li className="mr-4 xl:mr-2" onClick={handleSignInGoogle}><p className="text-black font-semibold text-sm px-4 py-2 bg-white/90 rounded-md cursor-pointer hover:bg-white"> Sign Up </p></li>
                  <li className="ml-4 xl:ml-2" onClick={handleSignInGoogle}><p className="text-white/70 font-semibold text-sm px-4 py-2 bg-[#1d1c1c56] rounded-md border border-[#525050] cursor-pointer hover:bg-[#202020]"> Log In </p></li>
                </ul>
              </div>
            </nav>
          </header>
    </main>
  )}  

export default Navbar