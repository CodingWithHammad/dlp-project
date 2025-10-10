import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js"

export const protect = async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.StartsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select("-password");
            if (!req.user) return req.status(401).json({ message: "User not found..." });
            next();
        } else {
            console.log("Not authorized, no token")
        }

    } catch (error) {
        console.log("Error present inside the protect middleware" + error.message);
        res.status(500).json({
            message: "Error present inside the protect middleware",
            error
        })
    }
}
