"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailValidationController_1 = require("../controllers/emailValidationController");
const domainExtractionController_1 = require("../controllers/domainExtractionController");
const router = (0, express_1.Router)();
router.post("/validate-email", emailValidationController_1.ValidateEmail);
router.post("/get-domain", domainExtractionController_1.ExtractDomain);
exports.default = router;
