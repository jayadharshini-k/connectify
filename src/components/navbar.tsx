"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
    const [nav, setNav] = useState(false);
    const { data: session }: any = useSession();

    console.log(session);

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed nav">
      <div>
        {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
        <h1 className="text-xl font-extrabold font-signature ml-2">
          <a
            className="link-underline link-underline-black"
            href="/"            
            rel="noreferrer"
          >
            DPRO
          </a>
        </h1>
      </div>

      <ul className="hidden md:flex mr-14">        
          <li            
            className="nav-links my-auto px-4 cursor-pointer capitalize font-medium text-gray-500 hover:text-white duration-200 link-underline"
          ><Link href={"/"}>Home</Link></li>
          {!session ? (
            <>
                <li            
                className="nav-links my-auto px-4 cursor-pointer capitalize font-medium text-gray-500 hover:text-white duration-200 link-underline"
                ><Button><Link href={"/register"}>Register</Link></Button></li>
                <li            
                className="nav-links my-auto px-4 cursor-pointer capitalize font-medium text-gray-500 hover:text-white duration-200 link-underline"
                ><Button><Link href={"/login"}>Login</Link></Button></li>
            </>
          ):(            
            <>
                <li            
                className="nav-links my-auto px-4 cursor-pointer capitalize font-medium text-gray-500 hover:text-white duration-200 link-underline"
                ><Link href={"/dashboard"}>Dashboard</Link></li>
                <li            
                className="nav-links my-auto px-4 cursor-pointer lowercase font-medium text-gray-100 hover:text-white duration-200 link-underline"
                >{session.user?.email}</li>                
                <li            
                className="nav-links my-auto px-4 cursor-pointer capitalize font-medium text-gray-500 hover:text-white duration-200 link-underline"
                ><Button onClick={() => { signOut(); }}>SignOut</Button></li>
            </>
          )}     
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="hidden md:flex mr-14">        
            <li            
            className="nav-links my-auto px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
            >Home</li>            
            <li            
            className="nav-links my-auto px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
            ><Button><Link href={"/register"}>Register</Link></Button></li>
            <li            
            className="nav-links my-auto px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
            ><Button><Link href={"/login"}>Login</Link></Button></li>        
        </ul>
      )}
    </div>
  );
};
