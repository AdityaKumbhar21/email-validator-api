"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const health_1 = require("./controllers/health");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/api", routes_1.default);
app.get("/health", health_1.healthCheck);
app.get("/", (req, res) => {
    res.send("Welcome to the Email Validator API");
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
exports.default = app;
