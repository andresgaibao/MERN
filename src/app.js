import express from "express";
import morgan from "morgan";

import authroutes from "./routes/auth.routes.js"

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use("/api", authroutes)

export default app;