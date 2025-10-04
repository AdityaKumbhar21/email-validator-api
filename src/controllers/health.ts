import { Request, Response } from 'express';

export function healthCheck(req: Request, res: Response){
    res.status(200).json({
        status: "ok",
        message: "Email validation API is running."
    });
}
