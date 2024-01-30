import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";

interface MessageDocument extends Document {
  name: string;
  message: string;
  sender: Schema.Types.ObjectId;
  date: Date;
}

const messageSchema = new Schema<MessageDocument, {}>({
  name: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true, default: Date.now },
});

const MessageModel = models.Message || model("Message", messageSchema);
export default MessageModel as Model<MessageDocument>;
