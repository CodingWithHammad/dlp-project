import express from "express"
import dotenv from "dotenv"

import { connectDB } from "./config/db.js"


dotenv.config()

const app = express()


app.get('/', (_, res) => { res.send('Server is running correctly...') })


connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port http://localhost:${process.env.PORT}/`)
})