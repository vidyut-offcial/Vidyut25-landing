import "./globals.css";

export const metadata = {
  title: "Vidyut 2025",
  description: "Multifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        suppressHydrationWarning={true}
      > 
        {children}
      </body>
    </html>
  );
}
