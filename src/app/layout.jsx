'use client'
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner"
import { UpdateCartContext } from "@/context/UpdateCartContext";
import { useState } from "react";




const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit', weight:['100','200','300','400','500','600','700','800','900']});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const [updateCart,setUpdateCart] = useState(false);
  return (
    <html lang="en">
      <body className={outfit.variable}>
        <UpdateCartContext.Provider value={{updateCart,setUpdateCart}}>
        <Header/>
        {children}
        <Toaster />
        </UpdateCartContext.Provider>
      </body>
    </html>
  );
}
