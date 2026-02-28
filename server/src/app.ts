import express, { type Request, type Response } from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import bulkRouter from "./routes/bulk.routes.js";
import dbConnect from "./config/dbConnect.js";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import { productRouter } from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
import customStitchRouter from "./routes/customStitch.routes.js";

dotenv.config();

const app = express();

const port = 3000;

await dbConnect();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/bulk", bulkRouter);
// app.use("/api/users");
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/custom-stitch", customStitchRouter);
// app.use("/api/cart");

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
