import mongoose from "mongoose";

interface User {
  username: string;
  password: string;
  role: string;
  // storeCategory: string;
}

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'admin'
  },
  // storeCategory : {
  //   type:String,
  //   required: true, 
  // }

})


export const User = mongoose.models.User || mongoose.model<User>('User', userSchema)