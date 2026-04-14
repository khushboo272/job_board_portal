import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();
const isProduction = process.env.NODE_ENV === "production";

if (!process.env.SECRET_KEY) {
    console.error("SECRET_KEY is not set. Add it in backend/.env (see backend/.env.example).");
    process.exit(1);
}

if (isProduction && !process.env.FRONTEND_URL) {
    console.error("FRONTEND_URL is required in production for CORS.");
    process.exit(1);
}

// middleware
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const allowedOrigins = [process.env.FRONTEND_URL].filter(Boolean);
const corsOptions = {
    origin:(origin, callback) => {
        // Allow server-to-server requests and local dev on any Vite port.
        if (!origin || /^http:\/\/localhost:\d+$/.test(origin) || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials:true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get("/health", (_req, res) => {
    res.json({ ok: true });
});

const startServer = async () => {
    const isDbConnected = await connectDB();
    if (!isDbConnected) {
        console.error("Server startup aborted because database connection failed.");
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
};

startServer();