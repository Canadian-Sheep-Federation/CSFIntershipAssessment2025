import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Word Explorer",
  description: "Explore words and their sentences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-900 text-slate-100 flex flex-col`}>
        <nav className="bg-slate-800 shadow-lg">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold text-sky-400 hover:text-sky-300 transition-colors">Word Explorer</a>
          </div>
        </nav>
        <main className="container mx-auto p-6 flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
