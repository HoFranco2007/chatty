import Navbar from "../components/Navbar"

export default function Home() {
  return (
    <body>
      <Navbar
        isOpen={false}
        page={"Home"}
      />
    </body>
  );
}
