import connectMongoDB from "@/lib/mongoDb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST( request: any ){
    const { username, email, password } = await request.json();
    await connectMongoDB();
    try{
        //check unique username
        const checkVerifiedUserByUsername = await User.findOne({username})

        if (checkVerifiedUserByUsername) {
            //return new NextResponse("Username is already taken or Unverified", { status: 400 });
            return new NextResponse(JSON.stringify({ error: 'Username is already taken or Unverified' }), { status: 400 });
        }

        //check already registered user
        const checkVerifiedUserByEmail = await User.findOne({email})
        if (checkVerifiedUserByEmail) {
            //return new NextResponse("Username is already exist with this email", { status: 400 });   
            return new NextResponse(JSON.stringify({ error: 'Email is already registered' }), { status: 400 });         
        }
        
        const hashedPassword = await bcrypt.hash(password, 6);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        try {
            await newUser.save();
            //return new NextResponse("User registerd successfully!", { status: 200 });
            return new NextResponse(JSON.stringify({ error: 'User registerd successfully!' }), { status: 200 });
        } catch (error:any){
            return new NextResponse( error, { status: 500 });
        }


    } catch (error:any) {
        return new NextResponse(error, {
            status: 500,
        });
    }
}
