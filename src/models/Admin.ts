import mongoose, { Schema, models } from "mongoose";

const AdminSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },
    invitedBy: {
      type: String,
      default: "system",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// ⚠️ IMPORTANT: Turbopack-safe export
const Admin = models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
