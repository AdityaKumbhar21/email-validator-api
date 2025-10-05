import { Request, Response } from 'express';
import disposableDomains from "disposable-email-domains";

interface ApiResponseEmail {
    isValid: boolean;
    isDisposable?: boolean;
    message: string;
}

function isDomainDisposable(email: string): boolean {
    const domain = email.split('@')[1].toLowerCase();
    return disposableDomains.includes(domain);
}

export default function handler(req: Request, res: Response): Response<ApiResponseEmail> {
    if (req.method !== 'POST') {
        return res.status(405).json({
            isValid: false,
            message: 'Method not allowed. Use POST.'
        });
    }

    try {
        const { email } = req.body;
    
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || typeof email !== "string") {
            return res.status(400).json({
                isValid: false,
                isDisposable: false,
                message: "Email is required and must be a string."
            });
        }

        if (!email || email.trim() === "") {
            return res.status(400).json({
                isValid: false,
                isDisposable: false,
                message: "Email cannot be empty"
            });
        }
    
        if (email.length > 254) {
            return res.status(400).json({
                isValid: false,
                isDisposable: false,
                message: "Email is too long (max 254 characters)."
            });
        }
    
        const atSymbolIndex = email.indexOf("@");
        const localPart = email.split("@")[0];
        const domain = email.split("@")[1];
    
        if (atSymbolIndex === -1) {
            return res.status(400).json({
                isValid: false,
                isDisposable: false,
                message: "Email is missing the '@' symbol."
            });
        }
    
        if (!localPart || localPart.length > 64) {
            return res.status(400).json({
                isValid: false,
                isDisposable: false,
                message: "Local part of the email is invalid (max 64 characters)."
            });
        }
        
        if (!domain || domain.length > 255) {
            return res.status(400).json({
                isValid: false,
                isDisposable: false,
                message: "Domain part of the email is invalid (max 255 characters)."
            });
        }
    
        if (!regex.test(email)) {
            return res.status(400).json({
                isValid: false,
                isDisposable: false,
                message: "Invalid email format. Ensure the username and domain contain only allowed characters (letters, numbers, '.', '_', '%', '+', '-')."
            });
        }
        
        return res.status(200).json({
            isValid: true,
            isDisposable: isDomainDisposable(email),
            message: "Email is valid."
        });
    } catch (error) {
        console.log("Email validation error: ", error);
        
        return res.status(500).json({
            isValid: false,
            message: "An error occurred while validating the email."
        });
    }
}