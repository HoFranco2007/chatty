import "../globals.css"
import "./signup.css"
import Form from "../../components/page/forms"

export default async function SignUp() {
  return(
    <>
      <main className="h-[100vh] w-[100vw] bg-black grid-background">
        <section className="grid grid-cols-2 items-center w-[100vw]">

          <div className="col-span-1">
            <img src="/home-bg.png" alt="" className="h-[100vh]"/>
          </div>

          <aside className="col-span-1 flex justify-center items-center">

            <div className="bg-[#747474] w-[30vw] h-[75vh] rounded-lg mr-[12vw] flex flex-col px-[2vw] py-[2vh]">
              
              <div>
                <h1 className="text-[1.65vw]">Create an Account</h1>
              </div>

              <div className="flex flex-col justify-center items-center px-[2vw] py-[3vh]">
                <div className="flex flex-row justify-center items-center px-[2vw] py-[1vh]">

                  <button className="px-[2vw] py-[1vh] flex flex-row justify-center items-center mr-[1vw] border border-[#CCCCCC]/80 hover:bg-[#CCCCCC]/90 transition-colors duration-500">
                    <img src="/google.png" className="w-[1.2vw] mr-[.5vw]" alt="" />
                    <p className="flex items-center mt-[.2vh]">Google</p>
                  </button>

                  <button className="px-[2vw] py-[0.8vh] flex flex-row justify-center items-center ml-[1vw] border border-[#CCCCCC]/80 hover:bg-[#CCCCCC]/90 transition-colors duration-500">
                    <img src="/github.png" className="w-[1.2vw] mr-[.5vw]" alt="" />
                    <p className="flex items-center mt-[.2vh]">GitHub</p>
                  </button>

                </div>
                
                <div className="mt-[1vh] flex flex-row divider">
                  <hr className="line"/>
                  <p className="text">Or</p>
                  <hr className="line"/>
                </div>
              </div>

              <div>
                <Form/>
              </div>

              <div className="ml-[.8vw]">
                <div className="mt-[2vh] text-sm tracking-tight">
                  <p className="mt-[.5vh]">By signing up you agree to our <a className="text-[#700079] underline-offset-0 hover:underline transition-all duration-300 " href="">terms of service</a></p>
                  <p className="mt-[.5vh]">Already have an account? <a className="text-[#700079] underline-offset-0 hover:underline transition-all duration-300 " href="">Log in</a></p>
                </div>
                <div className="mt-[3vh] text-xs tracking-normal">
                  <p>This site is protected by <a className="text-[#700079] underline-offset-0 hover:underline transition-all duration-300 " href="">hCaptcha</a>. Its <a className="text-[#700079] underline-offset-0 hover:underline transition-all duration-300 " href="">Privacy Policy</a> and <a className="text-[#700079] underline-offset-0 hover:underline transition-all duration-300 " href="">Terms of Service</a> apply.</p>
                </div>
              </div>

            </div>
          </aside>
        </section>
      </main>
    </>
  )
}