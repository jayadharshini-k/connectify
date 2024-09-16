import mongoose from "mongoose";

export default async function connectMongoDB(){
    if ( mongoose.connections[0].readyState) return;

    try{        
        await mongoose.connect(process.env.MONGODB_URL);
        /*await mongoose.connect(process.env.MONGODB_URL, {
          useNewURLParser : true,
          useUnifiedTopology: true,
        });*/
        console.log("MongoDB is Connected Successfully!");

      } catch (error){
        console.log("Error connecting MongoDB: " , error);
        throw new Error("Error connecting MongoDB");
      }
}
