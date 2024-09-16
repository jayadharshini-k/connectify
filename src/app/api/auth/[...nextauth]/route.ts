import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connectMongoDB from "@/lib/mongoDb";
import bcrypt from "bcryptjs";

export const authOptions:any = {
    providers : [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials:any){
                await connectMongoDB();
                try{
                    const user = await User.findOne({email: credentials.email});
                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        )
                        if ( isPasswordCorrect ){
                            return user;
                        }
                    }
                } catch (error: any){
                    throw new Error (error);
                }
            }
        })
    ],

    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy:"jwt"
     },
    callbacks: {
        async jwt({ token, user }: any) {
        // If the user is logged in, add the user ID and other info to the token
        if (user) {
            token.id = user.id;
            token.email = user.email;
        }
        return token;
        },
        async session({ session, token }: any) {
        // Attach user info from the token to the session
        session.user.id = token.id;
        session.user.email = token.email;
        return session;
        },
    },
}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };