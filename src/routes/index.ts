import { Router } from "express";
import { ValidateEmail } from "../controllers/emailValidationController";
import { ExtractDomain } from "../controllers/domainExtractionController";



const router = Router();

router.post("/validate-email", ValidateEmail)
router.get("/get-domain", ExtractDomain)



export default router