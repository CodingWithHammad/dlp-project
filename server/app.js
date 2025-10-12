import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/authRoutes.js"

import { connectDB } from "./config/db.js"


dotenv.config()

const app = express()
app.use(express.json());


app.get('/', (_, res) => { res.send('Server is running correctly...') })

// Routes
app.use("/api/auth", authRoutes);


connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port http://localhost:${process.env.PORT}/`)
})