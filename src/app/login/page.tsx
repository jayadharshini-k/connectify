import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/login-form";
import { ModeToggle } from "@/components/mode-toggle";

//import Logo from "../public/meteor.svg";

export default function Login() {
  return (
    <main className="flex w-screen h-screen justify-center items-center">
      <div className="absolute top-0 right-0 pt-5 pr-5"><ModeToggle/></div>
      <div className="container">

        <div className="rounded-[0.5rem] border dark:border-gray-700 border-slate-300 md:grid lg:grid-cols-2 min-h-[650px] max-[767px]:min-h-[550px]">
          <div className="md:flex bg-zinc-900 flex-col justify-between px-12 py-8 rounded-l-[0.5rem] border-r dark:border-gray-700 border-slate-300 mix-blend-multiply bg-no-repeat bg-top bg-cover bg-[url('/login-bg-dark.jpg')] space-y-5 max-[767px]:invisible max-[767px]:h-0 max-[767px]:p-0 ">
            
              <div className=""><Link href="/"><Image src={`/meteor.svg`} alt="logo" width="40" height="40" className="dark:invert invert" /></Link></div>
              <div className="leading-normal text-lg font-semibold text-zinc-50 dark:text-zinc-200">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</div>
            
          </div>

          <div className="flex flex-col w-full justify-center align-middle">            
            <div className="px-8 py-6 md:px-12 justify-center items-center">  
              <section className="flex flex-col justify-center items-center  pt-8 space-y-3">
                  <h3 className="tracking-tight">Sign In</h3>
                  <p className="text-sm text-slate-500 dark:text-zinc-100/75">Use your email and password to sign in</p>
              </section>    
              <section className="flex flex-col md:px-8 md:py-8 py-8">
                <LoginForm /> 
                <div className=" md:flex justify-center text-center text-slate-500 dark:text-zinc-100/75 pt-8 mt-6 space-y-2 leading-normal">Don't have an account? <div className="flex-col md:flex-row"><Link href="/register" className="text-slate-900 dark:text-zinc-50 hover:underline md:px-1">Sign up</Link>for free.</div></div>      
              </section>
            </div>
          </div>
        </div>

      </div>
      
    </main>
  );
}

