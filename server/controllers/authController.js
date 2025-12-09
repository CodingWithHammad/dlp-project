import { User } from "../models/User.model.js"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"
import { generateToken } from "../utlis/generateToken.js"
import dotenv from "dotenv"
import cloudinary from "../config/cloudnary.js"
import fs from "fs";

dotenv.config()


const transporter = nodemailer.createTransport(
    {
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        service: "gmail"
    }
)

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ✅ Validate fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if image file exists
    if (!req.file) {
      return res.status(400).json({ message: "Profile image is required" });
    }

    // ✅ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "dlp-users", // optional: creates a folder in Cloudinary
      transformation: [{ width: 400, height: 400, crop: "fill" }],
    });

    // ✅ Remove local file after upload
    fs.unlinkSync(req.file.path);

    // ✅ Hash password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: result.secure_url, // ✅ save Cloudinary URL
    });

    // ✅ Generate JWT token
    const token = generateToken(newUser._id);

    // ✅ Send success response
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profileImage: newUser.profileImage,
      },
      token,
    });
  } catch (error) {
    console.error("❌ Error in register controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Error in register controller",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) res.status(400).json({ message: "User is not found!..." })

        const isMatch = await user.matchPassword(password);
        if (!isMatch) console.log("Invalid credentials ...");

        console.log({
            message: `${user?.name} login successfully ...`,
            user
        })

        res.status(200).json({
            message: `${user?.name} login successfully ...`,
            token: generateToken(user?._id),
            user
        })

    } catch (error) {
        console.log("Error present inside the login controller : " + error);
        res.status(500).json({
            message: "Error present inside the login controller",
            status: 500
        })
    }
}



export const forgetPassword = async (req, res) => {
    try {

        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) res.status(400).json({ message: "User is not found..." })

        const otp = Math.floor(100000 + Math.random() * 90000).toString()
        user.otp = otp
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();

        await transporter.sendMail({
            from: `"Digital Learning Platform" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is ${otp}. It will expire in 10 minutes.`,
        });

        console.log({
            message: "OTP sent to your email",
            user
        })

        res.status(200).json({
            message: "OTP sent to your email",
            user
        });

    } catch (error) {
        console.log("Error present inside the forget password controller : " + error);
        res.status(500).json({
            message: "Error present inside the forget password controller",
            error
        })
    }
}


export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: "Please provide all fields." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP." });
        }
        if (user.otpExpiry < new Date()) {
            return res.status(400).json({ message: "OTP expired." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        console.log(`✅ Password reset successful for ${user.email}`);

        res.status(200).json({
            success: true,
            message: `Password successfully updated for user: ${user.name}`,
        });

    } catch (error) {
        console.error("❌ Error in resetPassword controller:", error.message);
        res.status(500).json({
            message: "Error in resetPassword controller",
            error: error.message,
        });
    }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        console.log(`👋 ${req.user?.name || "User"} logged out successfully.`);

        res.status(200).json({
            success: true,
            message: "User logged out successfully.",
        });
    } catch (error) {
        console.error("❌ Error in logout controller:", error.message);
        res.status(500).json({
            message: "Error in logout controller",
            error: error.message,
        });
    }
};
