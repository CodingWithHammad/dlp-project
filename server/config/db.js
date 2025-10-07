import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

export const connectDB = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("DB connected successfully... 👊 : " + response.connection.host);
    } catch (error) {
        console.log("Error present in... 👎 " + error.message)
        exit(1);
    }
}