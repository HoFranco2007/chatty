import "../globals.css"
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
            <div className="bg-[#746767] w-[30vw] h-[80vh] rounded-lg mr-[12vw] flex flex-col px-[2vw] py-[2vh]">
              <div>
                <h1 className="text-[2vw]">Create an Account</h1>
              </div>
              <div className="flex flex-col justify-center items-center px-[2vw] py-[2vh]">
                <div className="flex flex-row justify-center items-center px-[2vw] pb-[1vh]">
                  <button className="px-[2vw] py-[0.8vh] flex flex-row justify-center items-center mr-[1vw] border border-[#CCCCCC]">
                    <img src="/google.png" className="w-[1.2vw] mr-[.5vw]" alt="" />
                    <p className="flex items-center mt-[.2vh]">Google</p>
                  </button>
                  <button className="px-[2vw] py-[0.8vh] flex flex-row justify-center items-center ml-[1vw] border border-[#CCCCCC]">
                    <img src="/github.png" className="w-[1.2vw] mr-[.5vw]" alt="" />
                    <p className="flex items-center mt-[.2vh]">GitHub</p>
                  </button>
                </div>
                <div className="mt-[1vh]">
                  <p>or</p>
                </div>
                <div>
                  {/* inputs */}
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </>
  )
}