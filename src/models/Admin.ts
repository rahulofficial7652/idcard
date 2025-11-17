import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema ({
    clerkId: { 
        type: String,
        required: true,
        unique: true 
    },
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        default: "admin"
    },
    invitedBy: {
        type: String,
        required: true
    },
}, {timestamps: true})

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);