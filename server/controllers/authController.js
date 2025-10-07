import { User } from "../models/User.model.js"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"
import generateToken from "../utlis/generateToken.js"

const transporter = nodemailer.createTransport(
    {
        auth: {
            EMAIL_USER: process.env.EMAIL_USER,
            EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
        },
        service: "gmail"
    }
)

