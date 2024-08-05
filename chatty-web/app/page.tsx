import Navbar from "../components/Navbar";
import "./globals.css";
import Image from "next/image";


export default async function Home() {
  return (
    <body className="">
      <div className="absolute">
        <img src="/bg.png" alt="" className="relative h-[55vh] w-[100vw]"/>
      </div>
      <section className="bg-black h-[100vh] w-[100vw] grid-background">
        <Navbar isOpen={false} page={"Home"} />
          <div className="flex flex-row justify-center">
            <div className="flex flex-col justify-between h-[30vw]">
              <div className="flex flex-col">
                <div>
                  <h1 className="text-[4.5vw] font-bold text-[#CCCCCC]/95 ml-[1vw] mt-[3vw] w-[45vw]">
                    The solution for all your web problems.
                  </h1>
                </div>
                <div className="">
                  <h1 className="text-[2.5vw] font-semibold text-[#700079] ml-[1vw] drop-shadow-[0_1px_4px_rgba(112,0,121,1)]">
                    First and unique web helper
                  </h1>
                </div>
              </div>
              <div>
                <div className="flex flex-row">
                  <p className="text-[1.5vw]"><span className=" text-[#85F900] ml-[1vw] drop-shadow-[0_1px_2.5px_rgba(133,249,0,1)]">Everything</span><span className="text-[#CCCCCC]"> in a simple extension</span><span className="text-[#CCCCCC]"> - </span></p>
                  <button className="flex flex-row text text-[#CCCCCC] text-[1.4vw] drop-shadow-[0_1px_2.5px_rgba(255,255,255,1)] ml-[0.5vw] px-[0.5vw] py-[0.2vw] border border-[#F580F1] rounded-lg hover:border-white transition-colors duration-500">Add to chrome<img src="/chrome.png" className="ml-[0.5vw]" /></button>
                </div>
              </div>
            </div>
            <div>
              <img src={"/chatty.png"} alt="chatty" className="h-[35vw] w-[28vw] mr-[2vw] ml-[2vw] mt-[0.7vw]"></img>
            </div>
          </div>
      </section>
    </body>
  );
}
