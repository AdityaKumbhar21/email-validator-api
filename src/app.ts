import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import { healthCheck } from "./controllers/health";

const app = express();
app.use(bodyParser.json());
app.use("/api", router);
app.get("/health", healthCheck)

export default app;