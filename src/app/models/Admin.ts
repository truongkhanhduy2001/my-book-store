import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "admin",
  },
});

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
