



import dotenv from 'dotenv';

dotenv.config();


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.error(error)
        
    }
}


export default connectDB;