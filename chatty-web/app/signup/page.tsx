import "../globals.css"

export default async function SignUp() {
  return(
    <>
      <main className="h-[100vh] w-[100vw] bg-black grid-background">
        <section className="grid grid-cols-2 items-center w-[100vw]">
          <div className="col-span-1">
            <img src="/home-bg.png" alt="" className="h-[100vh]"/>
          </div>
          <aside className="col-span-1 flex justify-center items-center">
            <div className="bg-[#746767] w-[30vw] h-[80vh] rounded-lg mr-[12vw]">
                Sign Up
            </div>
          </aside>
        </section>
      </main>
    </>
  )
}