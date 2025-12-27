import mongoose, { Schema } from "mongoose";



const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            minlength: [6, "Password must be at least 6 characters long"],
        },
        role: {
            type: String,
            enum: ["student", "teacher", "admin"],
            default: "student",
        },
        profileImage: {
            type: String,
            required: [true, "Profile image is required"],
        },
        otp: {
            type: String,
            default: null,
        },
        otpExpiry: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", UserSchema);
// by hk