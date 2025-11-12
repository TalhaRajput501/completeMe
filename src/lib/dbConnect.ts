import mongoose from "mongoose";

type connectionObj = {
  isConnected?: number;
};

const connection: connectionObj = {};
export async function dbConnect(): Promise<void> {
  try {
    if (connection.isConnected) {
      console.log("Connection already exists");
      return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI || "");

    connection.isConnected = db.connections[0].readyState;

    // console.log(db.connections[0].readyState)
    // console.log(db.models)
    console.log("Data base connected successfully");
  } catch (error) {
    console.error("Error in connecting db ", error);
    process.exit(1);
  }
}
