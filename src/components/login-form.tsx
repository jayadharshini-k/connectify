"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
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
  email: z.string().email({
    message: "Enter a valid email address",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  })
}) 

export default function LoginForm() {
    const [error, setError] = useState("");
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
      if (status === "authenticated" ){
        router.replace("/dashboard");
      }
    }, [status, router]);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },      
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      
      const res = await signIn("credentials",{
        redirect: false,
        email: values.email,
        password: values.password,
      })

      if(res?.error){
        setError("Invalid email or password");
        if (res?.url) router.replace("/dashboard");
      }else{
        setError("");
      }
      console.log(values)
    };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <Button type="submit" className="inline-flex size-full">Sign In</Button>
        <div className="text-red-600 text-m py-2 mb-4" >{ error && error }</div>
      </form>
      
    </Form>
  )
}


