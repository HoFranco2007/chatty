import "../public/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="">
      <head>
        <title>StartApp</title>
      </head>
      <body className="">
        {children}
      </body>
    </html>
  );
}
