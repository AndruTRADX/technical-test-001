import { Schema } from "mongoose";

export interface MessageDocument {
  _id: string;
  name: string;
  message: string;
  sender: Schema.Types.ObjectId;
  date: Date;
}
