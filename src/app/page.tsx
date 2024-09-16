import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";


//import Logo from "../public/meteor.svg";

export default function Home() {
  return (
    <main className="flex w-screen h-screen justify-center items-center">
      <div className="absolute top-0 right-0 pt-5 pr-5"><ModeToggle/></div>
      <div className="container text-center">

        <h1 className="text-xxl text-center font-black pb-12">WELCOME TO DPRO</h1>      
        
      </div>
      
    </main>
  )
}


