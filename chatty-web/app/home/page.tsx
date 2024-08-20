import React from 'react'
import { AuthButtonServer } from "../../components/navbar/supabase/auth-button-server";
import { supabase } from '@/components/navbar/supabase/serverClient';
import Navbar from "../../components/navbar/navbar"
import { type Session } from "@supabase/supabase-js";
import { redirect } from 'next/navigation'
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function Home() {
    const {data: { user }} = await supabase.auth.getUser()
    const name = user?.user_metadata?.full_name || 'Guest';
    const email = user?.email || 'No email provided';

    if (!user) {
        redirect('http://localhost:3000/');
        return null;
    }

  return (
    <>
        <body className="">
            <div className="absolute">
                <img src="/bg.png" alt="" className="relative h-[55vh] w-[100vw]"/>
            </div>
            <section className="bg-black h-[100vh] w-[100vw] grid-background">
                <Navbar 
                    page = {"Home"} 
                    logged = {true}
                />
                <div className="flex flex-row justify-center">
                    <div className="flex flex-col justify-between h-[30vw]">
                        <div className="flex flex-col">
                            <div>
                                <h1 className="text-[4.5vw] font-bold text-[#CCCCCC]/95 ml-[1vw] mt-[3vw] w-[45vw]">
                                    The solution for all your web problems.
                                </h1>
                            </div>
                            <div className="">
                                <h1 className="text-[2.5vw] font-medium text-[#700079] ml-[1vw] drop-shadow-[0_1px_10px_rgba(197,1,226,0.9)]">
                                    First and unique web helper
                                </h1>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-row">
                                <p className="text-[1.5vw]"><span className=" text-[#85F900] ml-[1vw] drop-shadow-[0_1px_2.5px_rgba(133,249,0,1)]">Everything</span><span className="text-[#CCCCCC]"> in a simple extension</span><span className="text-[#CCCCCC]"> - </span></p>
                                <button className="flex flex-row ml-[0.5vw] px-[0.5vw] py-[0.2vw] border border-[#F580F1] rounded-lg hover:border-white transition-colors duration-500"><p className="text-[#CCCCCC] text-[1.4vw] drop-shadow-[0_1px_3px_rgba(255,255,255,1)]">Add to chrome</p><img src="/chrome.png" className="ml-[0.5vw]" /></button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src={"/chatty.png"} alt="chatty" className="h-[40vw] w-[30vw] mr-[2vw] ml-[2vw] "></img>
                    </div>
                </div>
            </section>
        </body>
        <div className='h-full w-full flex align-center justify-center flex-col p-6'>
            <AuthButtonServer />
            <div>
                <h1 className='text-3xl font-bold text-black'>Welcome {name}</h1>
                <p className='text-black'>Your email is {email}</p>
            </div>
        </div>
    </>
  )
}