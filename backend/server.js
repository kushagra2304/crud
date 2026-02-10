import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://notes-app-kush.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", taskRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
