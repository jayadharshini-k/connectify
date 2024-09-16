import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard(){
    const session = await getServerSession();
    if(!session){
        redirect("/");
    }
    return(        
        <main className="flex w-screen h-screen justify-center items-center">
        <div className="absolute top-0 right-0 pt-5 pr-5"><ModeToggle/></div>
        <div className="container text-center">

            <h1 className="text-xxl text-center font-black pb-12">Dashboard</h1>            
            
        </div>
        
        </main>
    )
}