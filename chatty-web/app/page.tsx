import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer"
import "./globals.css";
import SFCAdvantages from "@/components/info";
import ScrollCards from "@/components/page/cards-scroll";
import Separator from "@/components/page/separator";


const DiscoverIcon = () => (
  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l4-4m0 0l4-4m-4 4l-4-4m4 4l4 4" />
  </svg>
);

const DecisionIcon = () => (
  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const TimeIcon = () => (
  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-5a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default async function Home() {

  return (
    <>
      <section className="absolute">
        <img src="/bg.png" alt="" className="relative h-[45vh] w-[100vw]"/>
      </section>
      <Navbar 
        logged = {false}
        name={undefined}
        email={undefined}
        avatar={undefined}
      />
        <main className="">
          <section className="flex flex-row justify-center mt-[7vh] pb-[10vh]">
            <aside className="flex flex-col justify-between h-[30vw]">
              <div className="flex flex-col">
                <div>
                  <h1 className="text-[4.5vw] font-bold text-[#CCCCCC]/95 ml-[1vw] mt-[3vw] w-[45vw]">
                    The solution for all your web problems.
                  </h1>
                </div>
                <div className="">
                  <h1 className="text-[2.5vw] text-[#c600d4bb] ml-[1vw] transition-all duration-500">
                    First and unique web helper
                  </h1>
                </div>
              </div>
              <div>
                <div className="flex flex-row">
                  <p className="text-[1.5vw]"><span className="-z-10 text-[#85F900] ml-[1vw] font-semibold transition-all duration-500 hover:drop-shadow-[0_1px_2.5px_rgba(133,249,0,1)]">Everything</span><span className="text-[#CCCCCC]"> in a simple extension</span><span className="text-[#CCCCCC]"> - </span></p>
                  <button className="flex flex-row ml-[0.5vw] px-[0.5vw] py-[0.2vw] border border-[#F580F1] rounded-lg hover:border-white transition-colors duration-500"><p className="text-[#CCCCCC] text-[1.4vw] transition-all duration-500 hover:drop-shadow-[0_1px_3px_rgba(255,255,255,1)]">Add to chrome</p><img src="/icons/chrome.png" className="W-[2vw] h-[2vw] ml-[0.5vw]" /></button>
                </div>
              </div>
            </aside>
            <aside>
              <img src={"/chatty.png"} alt="chatty" className="h-[40vw] w-[30vw] mr-[2vw] ml-[2vw] "></img>
            </aside>
          </section>
        </main>
        <div className="flex flex-row mt-[12vh]">
          <ScrollCards />
        </div>
      <section className="flex items-center justify-center mb-[12vh] mt-[12vh]">
        <Separator />
      </section>
        <footer className="flex justify-center w-[100vw]">
          <Footer />
        </footer>
    </>
  );
}
