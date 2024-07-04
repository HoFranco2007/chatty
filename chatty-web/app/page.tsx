import Navbar from "../components/navbar"

export default function Home() {
  return (
    <body className="h-[100vh] w-[100vw] bg-gradient-to-r from-gray-600 via-[5B0662] to-[85F900] overflow-hidden">
      <Navbar
        isOpen={false}
        page={"Home"}
      />
      <section className="h-[100vh] w-[100vw] bg-gradient-to-r from-gray-600 via-[5B0662] to-[85F900] overflow-hidden">
          <div>
            <div>
              <div>
                <h1>CHATTY</h1>
                <h2>THE WEB HELPER</h2>
              </div>
              <div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad est soluta nisi quos exercitationem cum nam repellat aut numquam facere!</p>
              </div>
              <div>
                <button>
                  ADD TO CHROME
                </button>
              </div>
            </div>
            <div>
              
            </div>
          </div>
      </section>
    </body>
  );
}
