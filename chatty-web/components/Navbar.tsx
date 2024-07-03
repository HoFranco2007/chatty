"use client"

import { useState, useEffect } from "react";
import DeployableMenu from "./DeployableMenu";
import "./Navbar.css";

const Navbar = ({isOpen, page} : {isOpen : boolean; page : string}) => {
  const [scrolled, setScrolled] = useState(false);
  const [smallScreen, setSmallScreen] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(0);

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
          <header className={`fixed flex flex-row items-center justify-around w-full mb-32 ${ scrolled ? "bg-black border-b border-b-white transition-all duration-1000 shadow-4xl" : "bg-black transition-all duration-1000 border-b-0 border-b-white/0"}`}>
            <nav className="flex flex-row items-center justify-around w-full ">
              <p className="navbar-brand d-flex items-center text-white" >
                  <img src="/logo.png" alt="logo" className="p-4 w-20" />
              </p>
              <DeployableMenu/>
              <ul className="list-none flex flex-row items-center" id="nav-list">
              {Array.from({ length: 6 }, (_, index) => (
                <li
                  key={index}
                  className={` text-white/70 text-base cursor-pointer px-7 py-6${
                    hoveredIndex === index ? 'text-white/70 hover:text-white' : ''
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {index === 0 ? 'Home' : index === 1 ? 'Best Sellers' : index === 2 ? 'Cuidado Corporal' : index === 3 ? 'Cuidado Facial' : index === 4 ? 'Cuidado Capilar' : index === 5 ? 'Cuidado de Manos' : ``}
                </li>
              ))}
              {hoveredIndex !== null && <span
                className="transition-all duration-200"
                style={{
                  transform: `translateX(${hoveredIndex === 0 ? '10px' : hoveredIndex === 1 ? '110px' : hoveredIndex === 2 ? '250px' : hoveredIndex === 3 ? '425px' : hoveredIndex === 4 ? '585px' : hoveredIndex === 5 ? '755px' : '0'})`,
                  transition: '0.4s ease', 
                  display: 'inline-block', 
                  position: 'absolute',
                  width: `${hoveredIndex === 0 ? '80px' : hoveredIndex === 1 ? '110px' : hoveredIndex === 2 ? '150px' : hoveredIndex === 3 ? '140px' : hoveredIndex === 4 ? '145px' : hoveredIndex === 5 ? '160px' : '0'}`
                }}
              ></span>}
            </ul>
              <div>
                <ul className="flex flex-row items-center">
                  <li className="mr-4 xl:mr-2"><p className="text-black font-semibold text-base px-4 py-2 bg-white/90 rounded-md cursor-pointer hover:bg-white"> Contactanos </p></li>
                  <li className="ml-4 xl:ml-2"><p className="text-white/70 font-semibold text-base px-4 py-2 bg-[#1d1c1c56] rounded-md border border-[#525050] cursor-pointer hover:bg-[#202020]"> Nosotros </p></li>
                </ul>
              </div>
            </nav>
          </header>
        )}
    </main>
  )}  

export default Navbar