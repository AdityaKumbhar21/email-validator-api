"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = healthCheck;
function healthCheck(req, res) {
    res.status(200).json({
        status: "ok",
        message: "Email validation API is running."
    });
}
