import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());


app.use("/api/user", authRoutes);
app.use("/api/posts", postRoutes);


mongoose.connect(process.env.MONGO_URI).then(() => console.log("Mongo connected"))
  .catch(err => console.error(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
