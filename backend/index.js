import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import shopRouter from "./routes/shop.routes.js"
import itemRouter from "./routes/item.routes.js"
import orderRouter from "./routes/order.routes.js"
import http from "http"
import { Server } from "socket.io"
import socketHandler from "./socket.js"
dotenv.config()
const port = process.env.PORT || 5000
const app=express()
const server=http.createServer(app)
const io=new Server(server,{
     cors: {
    origin: "https://quick-zaikaa.onrender.com", // production में specific domain डालना
    methods: ["GET", "POST"],
    credentials: true  
  }
})
app.set("io", io);
app.use(cors({
    origin:"https://quick-zaikaa.onrender.com",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.get("/api/health", async (req, res) => {
  try {

    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB not connected");
    }

    await mongoose.connection.db.admin().ping();

    res.status(200).json({
      status: "ok",
      db: "connected",
      timestamp: new Date().toISOString(),
    });

  } catch (error) {

    res.status(500).json({
      status: "error",
      db: "disconnected",
      error: error.message,
    });

  }
});

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/shop",shopRouter)
app.use("/api/item",itemRouter)
app.use("/api/order",orderRouter)



socketHandler(io)




server.listen(port,()=>{
    console.log(`server started at ${port}`)
    connectDb()
})
