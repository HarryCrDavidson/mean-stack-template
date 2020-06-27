import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String },
});

// const User = mongoose.model("User", userSchema);+
export const user = mongoose.model<IUser>("user", userSchema);

// export const User = mongoose.model("User", userSchema);
