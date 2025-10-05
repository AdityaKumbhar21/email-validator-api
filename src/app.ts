import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import { healthCheck } from "./controllers/health";

const app = express();
app.use(bodyParser.json());
app.use("/api", router);
app.get("/health", healthCheck)

app.get("/", (req, res) => {
  res.send("Welcome to the Email Validator API");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
export default app;