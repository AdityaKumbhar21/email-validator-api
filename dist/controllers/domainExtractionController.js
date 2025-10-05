"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractDomain = ExtractDomain;
function ExtractDomain(req, res) {
    try {
        const { email } = req.body;
        if (!email || typeof email !== "string") {
            return res.status(400).json({
                success: false,
                domain: null,
                message: "Email is required and must be a string."
            });
        }
        if (email.trim() === "") {
            return res.status(400).json({
                success: false,
                domain: null,
                message: "Email cannot be empty"
            });
        }
        const atSymbolIndex = email.indexOf("@");
        if (atSymbolIndex === -1) {
            return res.status(400).json({
                success: false,
                domain: null,
                message: "Email is missing the '@' symbol."
            });
        }
        const domain = email.split("@")[1];
        if (!domain) {
            return res.status(400).json({
                success: false,
                domain: null,
                message: "Domain part of the email is missing."
            });
        }
        return res.status(200).json({
            success: true,
            domain: domain,
            message: "Domain extracted successfully."
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            domain: null,
            message: "Internal server error."
        });
    }
}
