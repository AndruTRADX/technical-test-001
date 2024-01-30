import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  role: "student" | "teacher";
}

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods>({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], default: "student" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    throw error;
  }
});

userSchema.methods.comparePassword = async function name(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const UserModel = models.User || model("User", userSchema);
export default UserModel as Model<UserDocument, {}, Methods>;
