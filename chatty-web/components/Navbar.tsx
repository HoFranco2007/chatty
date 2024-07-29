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
  const [smallScreen, setSmallScreen] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(0);

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
    setHoveredIndex(0);
  };
  return (
    <main className="top-0 overflow-hidden pb-36">
        {smallScreen ? (
          <section className="w-full h-full">
            <nav className={`fixed flex flex-row items-center justify-center w-full mb-32 ${ scrolled || isOpen ? "bg-black border-b border-b-white transition-all duration-1000 shadow-4xl" : "bg-black transition-all duration-1000 border-b-0 border-b-white/0"}`}>
              <div className="ml-6">
                <button
                  className="bg-none border-0 cursor-pointer w-[60px] h-[60px] p-0"
                >
                  <span
                    className={`rounded-[5px] bg-white/70 block w-[40%] mt-[5px] mb-[auto] h-[2px] transition-all duration-700 ${
                      isOpen ? "rotate-45 translate-y-[7px]" : ""
                    }`}
                  />
                  <span
                    className={`rounded-[5px] block w-[40%] mt-[5px] mb-[auto] h-[2px] transition-all ${
                      isOpen
                        ? "bg-none bg-transparent"
                        : "bg-white/70 duration-1000"
                    }`}
                  />
                  <span
                    className={`rounded-[5px] bg-white/70 block w-[40%] mt-[5px] mb-[auto] h-[2px] transition-all duration-700 ${
                      isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex flex-row items-center justify-center mr-12 w-full">
                <p className="" >
                    <img src="/logo.png" alt="logo" className="p-4 w-20" />
                </p>
                {/* <div>
                  <SearchBar />
                </div> */}
              </div>
            </nav>
            <div className={`fixed top-[5.7rem] w-[14rem] h-full bg-black transition-all duration-1000 ${isOpen ? "border-r border-r-white transition-all duration-1000" : "border-r-0 border-r-white/0 transition-all duration-1000 -translate-x-[14rem]"}`}>
              <ul className="list-none flex flex-col items-center" id="nav-list">
                <li className={`m-4 text-base cursor-pointer px-3 py-2 rounded-full transition-colors duration-200 ${page === "Home" ? "text-white bg-[#272727]" : "text-white/70 hover:text-white hover:bg-[#0f0f0f]"}`}> Home </li>
                <li className={`m-4 text-base cursor-pointer px-3 py-2 rounded-full transition-colors duration-200 ${page === "Best Sellers" ? "text-white bg-[#272727]" : "text-white/70 hover:text-white hover:bg-[#0f0f0f]"}`}> Best Sellers </li>
                <li className={`m-4 text-base cursor-pointer px-3 py-2 rounded-full transition-colors duration-200 ${page === "Cuidado Corporal" ? "text-white bg-[#272727]" : "text-white/70 hover:text-white hover:bg-[#0f0f0f]"}`}> Cuidado Corporal </li>
                <li className={`m-4 text-base cursor-pointer px-3 py-2 rounded-full transition-colors duration-200 ${page === "Cuidado Facial" ? "text-white bg-[#272727]" : "text-white/70 hover:text-white hover:bg-[#0f0f0f]"}`}> Cuidado Facial </li>
                <li className={`m-4 text-base cursor-pointer px-3 py-2 rounded-full transition-colors duration-200 ${page === "Cuidado Capilar" ? "text-white bg-[#272727]" : "text-white/70 hover:text-white hover:bg-[#0f0f0f]"}`}> Cuidado Capilar </li>
                <li className={`m-4 text-base cursor-pointer px-3 py-2 rounded-full transition-colors duration-200 ${page === "Cuidado de Manos" ? "text-white bg-[#272727]" : "text-white/70 hover:text-white hover:bg-[#0f0f0f]"}`}> Cuidado de Manos </li>
                </ul>
                <div>
                  <ul className="flex flex-col items-center justify-center mt-40 w-full">
                    <li className="mb-2 xl:mr-2"><p className="flex flex-col items-center justify-center text-black font-semibold text-base px-2 py-2 bg-white/90 rounded-md cursor-pointer hover:bg-white"> Contactanos </p></li>
                    <li className="mt-2 xl:ml-2"><p className="flex flex-col items-center justify-center text-white/70 font-semibold text-base px-4 py-2 bg-[#1d1c1c56] rounded-md border border-[#525050] cursor-pointer hover:bg-[#1a1919]"> Nosotros </p></li>
                  </ul>
                </div>
            </div>
          </section>
        ) : (
          <header className={`fixed flex flex-row items-center justify-around w-full mb-32 ${ scrolled ? "bg-none border-b border-b-white transition-all duration-1000 shadow-4xl" : "bg-black transition-all duration-1000 border-b-0 border-b-white/0"}`}>
            <nav className="flex flex-row items-center justify-around w-full ">
              <p className="navbar-brand d-flex items-center text-white" >
                  <img src="/chatty.png" alt="logo" className="p-4 w-20" />
              </p>
              <ul className="list-none flex flex-row items-center" id="nav-list">
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
                  className="transition-all duration-200"
                  style={{
                    transform: `translateX(${hoveredIndex === 0 ? '0.6vw' : hoveredIndex === 1 ? '6vw' : hoveredIndex === 2 ? '13vw' : hoveredIndex === 3 ? '19vw' : hoveredIndex === 4 ? '25vw' : ""})`,
                    transition: '0.3s ease', 
                    display: 'inline-block', 
                    position: 'absolute',
                    width: `${hoveredIndex === 0 ? '80px' : hoveredIndex === 1 ? '110px' : hoveredIndex === 2 ? '90px' : hoveredIndex === 3 ? '100px' : hoveredIndex === 4 ? '135px' : '0'}`
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
        )}
    </main>
  )}  

export default Navbar