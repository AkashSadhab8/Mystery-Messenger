import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  ceratedAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  ceratedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  message: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter a  email address"],
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  verifyCode: {
    type: String,
    required: [true, "Please enter a valid code"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Please enter a valid code expiration date"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    required: true,
  },
  message: {
    type: [MessageSchema],
    required: true,
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
