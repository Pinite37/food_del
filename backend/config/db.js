import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://afomassetheophas:yZub5U3D6qT0FTYP@cluster0.0liolz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("MongoDB Connected"));
};
