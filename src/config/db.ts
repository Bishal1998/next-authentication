import mongoose from "mongoose"

const connectToDb = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URL as string);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error);
        throw new Error("Could not connect to database")
    }
}

export default connectToDb;