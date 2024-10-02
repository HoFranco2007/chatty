"use client"

import "../globals.css"
import "./signup.css"
import Form from "../../components/page/signup-form"
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/components/navbar/supabase/clientClient";

export default async function SignUp() {
  const router = useRouter()

  const handleSignInGoogle = async () => {
    await supabaseClient.auth.signInWithOAuth({
        provider:"google",
        options: {
            redirectTo: "http://localhost:3000/auth/callback"
        }
    })
  }
  const handleSignOut = async () => {
      await supabaseClient.auth.signOut()
      router.push("/")
  }
  return(
    <>
      <main className="h-[100vh] w-[100vw] bg-black grid-background">
        <section className="grid grid-cols-2 items-center w-[100vw]">

          <div className="col-span-1">
            <img src="/home-bg.png" alt="" className="h-[100vh]"/>
          </div>

          <aside className="col-span-1 flex justify-center items-center">

            <div className="bg-[#0e0e0e] w-[40vw] h-[69vh] mr-[12vw] flex flex-col justify-center px-[2vw] py-[1vh] rounded">
              
              <div>
                <h1 className="text-[1.65vw] text-white">Create an Account</h1>
              </div>

              <div className="flex flex-col justify-center items-center px-[2vw] py-[2vh]">
                <div className="flex flex-row justify-center items-center px-[2vw] py-[2vh]">

                  <button className="px-[2vw] py-[1vh] flex flex-row justify-center items-center mr-[1vw] border border-[#CCCCCC]/80 bg-[#CCCCCC]/90 transition-colors duration-500 hover:bg-white rounded-full">
                    <img src="/icons/google.png" className="w-[1.2vw] mr-[.5vw]" alt="" />
                    <p className="flex items-center mt-[.2vh]">Google</p>
                  </button>

                  <button className="px-[2vw] py-[1vh] flex flex-row justify-center items-center ml-[1vw] border border-[#CCCCCC]/80 bg-[#CCCCCC]/90 transition-colors duration-500 hover:bg-white rounded-full">
                    <img src="/icons/github.png" className="w-[1.2vw] mr-[.5vw]" alt="" />
                    <p className="flex items-center mt-[.2vh]">GitHub</p>
                  </button>

                </div>
                
                <div className="mt-[2vh] flex flex-row divider">
                  <hr className="line"/>
                  <p className="text mx-[1vw]">Or</p>
                  <hr className="line"/>
                </div>
              </div>

              <div>
                <Form/>
              </div>

              <div className="ml-[.8vw]">
                <div className="mt-[1vh] text-sm tracking-normal">
                  <p className="mt-[.5vh] text-[#CCCCCC] ">By signing up you agree to our <a className="text-[#700079] underline-offset-0 hover:underline transition-all duration-300 ml-[0.1vw]" href="">Terms of Service</a></p>
                  <p className="mt-[.5vh] text-[#CCCCCC]">Already have an account? <a className="text-[#700079] underline-offset-0 hover:underline transition-all duration-300 ml-[0.1vw]" href="">Log in</a></p>
                </div>
              </div>

            </div>
          </aside>
        </section>
      </main>
    </>
  )
}