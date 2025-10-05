import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import router from "../src/routes";
import { healthCheck } from "../src/controllers/health";

const app = express();
app.use(bodyParser.json());
app.use("/api", router);
app.get("/health", healthCheck);

// Export handler for Vercel serverless functions
export default (req: Request, res: Response) => {
  return app(req, res);
};