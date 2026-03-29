const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes=require("./routes/authRoutes")
const productRoutes=require("./routes/productRoutes")
const orderRoutes=require("./routes/orderRoutes")
const cartRoutes=require("./routes/cartRoute")
const errorHandler=require("./middleware/errorHandler")
const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

//routes
app.use("/api/auth",authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/cart",cartRoutes);
app.use(errorHandler)

app.listen(5000,()=>{
    connectDB()
    console.log("Server running on port 5000");
})