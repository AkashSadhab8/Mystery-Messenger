import mongoose from "mongoose";

type ConnectionObject = {
  isconnected?: number;
};

const connection: ConnectionObject = {};
async function dbConnect(): Promise<void> {
  if (connection.isconnected) {
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isconnected = db.connections[0].readyState;
    console.log("Successfully Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);

    process.exit(1);
  }
}

export default dbConnect;
