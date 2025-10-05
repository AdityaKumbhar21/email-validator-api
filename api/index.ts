import express from "express";
import bodyParser from "body-parser";
import router from "../src/routes";
import { healthCheck } from "../src/controllers/health";

const app = express();
app.use(bodyParser.json());
app.use("/api", router);
app.get("/health", healthCheck);

// For Vercel serverless functions
export default app;