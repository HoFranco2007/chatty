"use client"

import Navbar from "../components/Navbar";
import "./globals.css";
import Image from "next/image";
import { supabaseClient } from "../components/supabase/clientClient";

export default async function Home() {

  const {data: user} = await supabaseClient.auth.getUser()
  const name = user.user?.user_metadata.full_name
  const email = user.user?.email

  return (
    <section className="h-[100vh] w-[100vw] bg-gradient-to-r from-slate-950 from-45% via-[#5B0662] via-70% to-[#85F900] overflow-hidden">
      <Navbar isOpen={false} page={"Home"} />
        <div className="flex flex-row justify-around">
          <div className="flex flex-col justify-around">
            <div className="flex justify-start flex-col h-[20vw]">
              <span className="absolute mx-auto py-[0.15vw] flex border w-fit blur-xl bg-[#85F900] bg-clip-text text-[8.5vw] box-content font-extrabold text-transparent text-center select-none">
                  CHATTY
              </span>
              <p className="flex items-baseline text-[8.5vw] font-extrabold text-[#85F900] h-[10vw]">CHATTY</p>
              <p className="flex ml-2 items-end text-[4vw] font-bold mt-4 h-[5vw] bg-gradient-to-r from-[#5B0662] to-[#F580F1] text-transparent bg-clip-text">THE WEB HELPER</p>
            </div>
            <div>
              <p className="text-[1.2vw] font-bold text-[#CCCCCC] w-[35vw]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad est
                soluta nisi quos exercitationem cum nam repellat aut numquam
                facere!
              </p>
            </div>
            <div>
              <button>ADD TO CHROME</button>
            </div>
          </div>
          <div>
            <Image src={"/chatty.png"} alt="chatty" height={500} width={250} />
          </div>
        </div>
    </section>
  );
}
