import express from "express";
import morgan from "morgan";
import authroutes from "./routes/auth.routes.js";
import taskRouter from "./routes/task.routes.js"
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser()); //Para manejar y acceder de forma más sencilla a las cookies.
app.use("/api", authroutes)
app.use("/api", taskRouter)

export default app;