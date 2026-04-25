import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1); // ⛔ app band ho jayega agar DB fail hua
  }
};

export default connectDB;
