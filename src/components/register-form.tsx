"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";


const formSchema = z
  .object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    email: z.string().email({
      message: "Enter a valid email address",
    }),
    password: z.string().min(5, {
      message: "Password must be at least 5 characters.",
    }),    
  })  
  



export default function RegisterForm() {
    const [error, setError] = useState(""); // Error state
    const [success, setSuccess] = useState(""); // Success message state
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      mode: "onChange",
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },      
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.

      try {
        const res = await fetch ("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
          })
        })
        const result = await res.json(); // Parse JSON response

        console.log(result);
        
        if (res.status === 400){
          if (result.error === 'Username is already taken or Unverified') {
            setError("This username is already taken or unverified");
          } else if (result.error === 'Email is already registered') {
            setError("This email is already registered");
          } else {
            setError("Unknown error occurred");
          }
         //setError("This email is already registered");        
        }else if( res.status === 200){
          setError("");
          setSuccess("User registerd successfully!");
          //router.push("/login");
          // Wait for 10 seconds before clearing the message
          setTimeout(() => {
            //setSuccess("");
            setSuccess("User registerd successfully!");
            router.push("/login"); // Redirect to login after 10 seconds
          }, 5000); // 10 seconds
        }
      } catch (error:any) {
        setError("Unable complete the registration. Please try again");
        console.log("Unable complete the registration. Error: ", error);
      }
      console.log(values)
    }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="!mt-5">
              <FormLabel className="uppercase text-xs text-slate-900 dark:text-zinc-100/75 font-semibold">Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John Doe" {...field} className="leading-normal h-[45px] focus:outline-none focus-visible:ring-offset-0 dark:focus-visible:ring-slate-800" />
              </FormControl>             
              <FormMessage />
          </FormItem>
          )}
        />

        <FormField          
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>            
              <FormLabel className="uppercase text-xs text-slate-900 dark:text-zinc-100/75 font-semibold">Email address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@gmail.com" {...field} className="leading-normal h-[45px] focus-visible:ring-offset-0 dark:focus-visible:ring-slate-800" />
              </FormControl>              
              <FormMessage />               
          </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="!mt-5">
              <FormLabel className="uppercase text-xs text-slate-900 dark:text-zinc-100/75 font-semibold">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*********" {...field} className="leading-normal h-[45px] focus:outline-none focus-visible:ring-offset-0 dark:focus-visible:ring-slate-800" />
              </FormControl>             
              <FormMessage />
          </FormItem>
          )}
        />

        <Button type="submit" className="inline-flex size-full">Register</Button>
        {error && <div className="text-red-600 text-m py-2 mb-4">{error}</div>}
        {success && <div className="text-white text-center font-semibold text-m py-2 mb-4 bg-emerald-800 rounded-md">{success}</div>}
      </form>
      
    </Form>
  )
}


