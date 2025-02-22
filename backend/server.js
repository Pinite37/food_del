import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"

import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
// import orderRouter from "./routes/orderRoute.js"


//app config

const app = express()
const port = 4003

// middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();


// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
// app.use("/api/order", orderRouter)

app.get("/", (req , res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})



//mongodb+srv://afomassetheophas:renaissance2003@cluster0.bpvt0ub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0