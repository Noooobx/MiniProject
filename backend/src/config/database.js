import mongoose from "mongoose";
import User from "../models/useModel";
const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};
const testSchema = new mongoose.Schema({ name: String });
const TestModel = mongoose.model("Test", testSchema);


export default connectDb;
