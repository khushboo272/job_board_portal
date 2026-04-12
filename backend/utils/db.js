import mongoose from "mongoose";

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error(
            "MONGO_URI is not set. Add it in backend/.env (see backend/.env.example)."
        );
        return false;
    }
    try {
        await mongoose.connect(uri);
        console.log('mongodb connected successfully');
        return true;
    } catch (error) {
        console.error("MongoDB connection failed.");
        console.error(error);
        console.error(
            "If you are using MongoDB Atlas, verify the cluster hostname, network access (IP whitelist), and DNS/internet connectivity."
        );
        return false;
    }
}
export default connectDB;