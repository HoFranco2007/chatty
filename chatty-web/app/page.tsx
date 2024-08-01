
import Navbar from "../components/Navbar";
import "./globals.css";
import Image from "next/image";


export default async function Home() {

  return (
    <body className="">
      <section className="bg-black h-[100vh] w-[100vw] grid-background">
        <div className="absolute h-[100vh] w-[100vw]">
            <img src="/bg.png" alt="" className="relative h-[100vh] w-[100vw] -top-12 -left-12"/>
        </div>
        <Navbar isOpen={false} page={"Home"} />
          <div className="flex flex-row justify-around">
            <div className="flex flex-col justify-around">
              <div className="flex justify-start flex-col h-[20vw]">
                <p className="flex ml-2 items-end text-[4vw] font-bold mt-4 h-[5vw] bg-gradient-to-r from-[#5B0662] to-[#F580F1] text-transparent bg-clip-text">THE WEB HELPER</p>
                <div>
                  <p className="text-[1.3vw] font-bold text-[#CCCCCC] w-[35vw] mt-[3vw] ml-[1vw]">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, amet atque, molestias dolorem commodi culpa voluptate quasi voluptatem
                  </p>
                </div>
              </div>
              <div className="flex items-center ">
                <button className="bg-gradient-to-r from-[#85F900] to-[#85F900]/70 p-[1vw] text-[1.3vw] text-black font-extrabold rounded-3xl mt-[2vw] ml-[1vw]">ADD TO CHROME</button>
              </div>
            </div>
            <div>
              <Image src={"/chatty.png"} alt="chatty" height={500} width={500} />
            </div>
          </div>
      </section>
    </body>
  );
}
