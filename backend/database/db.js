import mongoose from 'mongoose';

const connectDB = async()=>{
    try{
     await mongoose.connect(process.env.MONGODB_URL) 
     console.log('Mongodb is connected') 
    }
    catch(e){
      console.log('mongodb not connected',e)
    }
}
export default connectDB;