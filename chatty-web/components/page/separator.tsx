"use client";

import React, { useEffect, useState } from "react";
import "./separator.css";

const Carrousel = () => {
  return(
    <div className="logos w-[50vw]">
      <div className="logos-slide flex justify-center items-center">
        <img src={"/icons/google.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"/icons/github.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"/icons/github.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"/icons/google.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"/icons/github.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
      </div>
      <div className="logos-slide flex justify-center items-center">
        <img src={"/icons/google.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"/icons/github.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"/icons/github.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"/icons/google.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png "} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
        <img src={"/icons/github.png"} alt="Stack Icon" className="p-[1vw] mr-[2vw] w-[8vw] h-[8vh] bg-[#8732ff]" />
      </div>
    </div>
  )
}

const Separator: React.FC = () => {
  const icons = [
    "/icons/google.png",
    "/icons/chrome.png",
    "/icons/github.png",
    "/icons/instagram.png",
    "/icons/youtube.png",
  ];

  return (
    <div className="flex flex-row items-center justify-around bg-[#1A0034] py-12 overflow-hidden w-[100vw] border-t border-[#CCCCCC] border-b">
      <h2 className="text-white text-[2.5vw] text-start font-extralight  p-2 mb-8 mx-[10vw]">
        Whatever webpage you are interested. We got you covered.
      </h2>
      <div className="flex flex-col">
        <div className="my-[2vh]">
          <Carrousel />
        </div>
        <div className="my-[2vh]">
          <Carrousel />
        </div>
      </div>
    </div>
  );
};

export default Separator;
