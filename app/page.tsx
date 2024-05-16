import "./globals.css"
import Image from "next/image";

export default function Home() {
  return (
    <html lang="en">
      <body>
        <Image
          src="chatty.png"
          alt="Picture of Chattys"
          width={250}
          height={250}
        />
      </body>
    </html>
  );
}
