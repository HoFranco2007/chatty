
import Navbar from "../components/Navbar";
import "./globals.css";
import Image from "next/image";


export default async function Home() {

  return (
    <section className="h-[100vh] w-[100vw] bg-gradient-to-l from-black via-[#5B0662] via-20% to-black overflow-hidden">
      <Navbar isOpen={false} page={"Home"} />
        <div className="flex flex-row justify-around">
          <div className="flex flex-col justify-around">
            <div className="flex justify-start flex-col h-[20vw]">
              <span className="absolute mx-auto py-[0.15vw] flex border w-fit blur-xl bg-[#85F900] bg-clip-text text-[8.5vw] box-content font-extrabold text-transparent text-center select-none">
                  CHATTY
              </span>
              <p className="flex items-baseline text-[8.5vw] font-extrabold text-[#85F900] h-[10vw]">CHATTY</p>
              <p className="flex ml-2 items-end text-[4vw] font-bold mt-4 h-[5vw] bg-gradient-to-r from-[#5B0662] to-[#F580F1] text-transparent bg-clip-text">THE WEB HELPER</p>
              <div>
                <p className="text-[1.3vw] font-bold text-[#CCCCCC] w-[35vw] mt-[3vw] ml-[1vw]">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, amet atque, molestias dolorem commodi culpa voluptate quasi voluptatem
                </p>
              </div>
            </div>
            <div className="flex items-center ">
              <button className="bg-gradient-to-r from-[#85F900] to-[#85F900]/70 p-[1vw] text-[1.3vw] text-black font-extrabold rounded-3xl mt-[3vw] ml-[1vw]">ADD TO CHROME</button>
            </div>
          </div>
          <div>
            <Image src={"/chatty.png"} alt="chatty" height={500} width={500} />
          </div>
        </div>
    </section>
  );
}
