# Email Validation API

Welcome to the **Email Validation API**—a lightweight, powerful tool to validate email addresses and extract domains with ease! Whether you're building a user registration system, cleaning up your email lists, or preventing spam with disposable email detection, this API has you covered. Built with Node.js, Express, and TypeScript, it’s designed for reliability, speed, and seamless integration with platforms like **RapidAPI** for monetization.

Deployed on a free hosting service like **Vercel** or **Render**, this API is perfect for startups, hobbyists, or anyone looking to validate emails without breaking the bank. Ready to dive in? Let’s explore the endpoints, see some code, and get you validating emails in no time!

## Features
- **Email Validation**: Checks if an email is syntactically valid and not from a disposable domain.
- **Domain Extraction**: Extracts the domain from any email address.
- **Health Check**: Ensures the API is up and running.
- **RapidAPI Ready**: Monetize your API with freemium or subscription plans.
- **Free Hosting Friendly**: Works on Vercel (no sleep) or Render (with UptimeRobot to prevent sleep).

## Getting Started
1. **Deploy the API**:
   - Clone the repo: `git clone <your-repo-url>`
   - Install dependencies: `npm install`
   - Deploy to Vercel (recommended) or Render:
     - **Vercel**: Push to GitHub, connect to Vercel, and deploy with `vercel.json`.
     - **Render**: Set build command (`npm install`) and start command (`node src/index.js`).
   - For Render, set up UptimeRobot to ping `/health` every 10 minutes to prevent sleep.
2. **Integrate with RapidAPI**:
   - Sign up at [rapidapi.com](https://rapidapi.com).
   - Add your endpoint (e.g., `https://your-api.vercel.app/validate-email`).
   - Set pricing (e.g., 100 free requests/day, $0.01 per extra request).
3. **Test Locally**:
   ```bash
   npm start
   curl -X POST http://localhost:3000/validate-email -H "Content-Type: application/json" -d '{"email": "test@example.com"}'
   ```

## API Endpoints
The API exposes three endpoints, each with specific request and response formats. Below is detailed documentation for each.

### 1. POST /validate-email
Validates an email address for syntax and checks if it uses a disposable domain (e.g., `10minutemail.com`). Returns whether the email is valid and disposable, with a descriptive message.

#### Request
- **Method**: POST
- **URL**: `/validate-email`
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "email": "string"
  }
  ```
- **Example**:
  ```bash
  curl -X POST https://your-api.vercel.app/validate-email -H "Content-Type: application/json" -d '{"email": "test@example.com"}'
  ```

#### Response
- **Content-Type**: `application/json`
- **Schema** (`ApiResponseEmail`):
  ```typescript
  interface ApiResponseEmail {
    isValid: boolean;      // True if email passes all syntax checks
    isDisposable: boolean; // True if email uses a disposable domain
    message: string;       // Descriptive message about the result
  }
  ```
- **Status Codes**:
  - `200 OK`: Email is valid and not disposable.
  - `400 Bad Request`: Invalid email format or missing input.
  - `500 Internal Server Error`: Server-side error (e.g., disposability check failure).
- **Example Success Response** (valid email):
  ```json
  {
    "isValid": true,
    "isDisposable": false,
    "message": "Email is valid."
  }
  ```
- **Example Error Responses**:
  - Missing email:
    ```json
    {
      "isValid": false,
      "isDisposable": false,
      "message": "Email is required and must be a string."
    }
    ```
  - Invalid format:
    ```json
    {
      "isValid": false,
      "isDisposable": false,
      "message": "Invalid email format. Ensure the username and domain contain only allowed characters (letters, numbers, '.', '_', '%', '+', '-')."
    }
    ```
  - Disposable domain:
    ```json
    {
      "isValid": true,
      "isDisposable": true,
      "message": "Email is valid."
    }
    ```
  - Server error:
    ```json
    {
      "isValid": false,
      "isDisposable": false,
      "message": "An error occurred while validating the email."
    }
    ```

#### Validation Rules
- Email must be a string and not empty.
- Total length ≤ 254 characters (per RFC 5321).
- Username (local part before `@`) ≤ 64 characters.
- Domain (after `@`) ≤ 255 characters and must include a valid top-level domain (e.g., `.com`, `.org`).
- Must match regex: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`.
- Disposable domains checked via `disposable-email-domains` package.

#### Notes
- Use this endpoint for user registration, form validation, or spam prevention.
- Disposable check uses a local list for speed, ensuring <1s response times.
- Consider adding `?skipDisposable=true` to bypass disposability check if needed.

### 2. POST /get-domain
Extracts the domain from an email address (e.g., `example.com` from `test@example.com`). Useful for analytics or domain-specific checks.

#### Request
- **Method**: POST
- **URL**: `/get-domain`
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "email": "string"
  }
  ```
- **Example**:
  ```bash
  curl -X POST https://your-api.vercel.app/get-domain -H "Content-Type: application/json" -d '{"email": "test@example.com"}'
  ```

#### Response
- **Content-Type**: `application/json`
- **Status Codes**:
  - `200 OK`: Domain extracted successfully.
  - `400 Bad Request`: Invalid email format or missing input.
  - `500 Internal Server Error`: Server-side error.
- **Example Success Response**:
  ```json
  {
    "success": true,
    "domain": "example.com",
    "message": "Domain extracted successfully."
  }
  ```
- **Example Error Responses**:
  - Missing email:
    ```json
    {
      "success": false,
      "domain": null,
      "message": "Email is required and must be a string."
    }
    ```
  - Missing `@` symbol:
    ```json
    {
      "success": false,
      "domain": null,
      "message": "Email is missing the '@' symbol."
    }
    ```
  - Missing domain:
    ```json
    {
      "success": false,
      "domain": null,
      "message": "Domain part of the email is missing."
    }
    ```
  - Server error:
    ```json
    {
      "success": false,
      "domain": null,
      "message": "Internal server error."
    }
    ```

#### Validation Rules
- Email must be a string and not empty.
- Must contain exactly one `@` symbol.
- Domain (after `@`) must exist.

#### Notes
- Use this endpoint for domain analytics or pre-processing emails before validation.
- Lightweight and fast, no external dependencies.
- **Note**: The router defines this as a GET route, but the controller expects a POST request. To align with the controller, this is documented as POST. To use GET, update the controller to use `req.query.email` (see Troubleshooting).

### 3. GET /health
Checks if the API is running. Ideal for monitoring and keeping the app awake on free-tier hosts like Render.

#### Request
- **Method**: GET
- **URL**: `/health`
- **Content-Type**: None (no body required)
- **Example**:
  ```bash
  curl https://your-api.vercel.app/health
  ```

#### Response
- **Content-Type**: `application/json`
- **Schema**:
  ```typescript
  {
    status: string;    // "ok" if API is running
    message: string;   // Descriptive message
  }
  ```
- **Status Codes**:
  - `200 OK`: API is running.
- **Example Response**:
  ```json
  {
    "status": "ok",
    "message": "Email validation API is running."
  }
  ```

#### Notes
- Use this endpoint with UptimeRobot (every 10-14 min) to prevent sleep on Render’s free tier.
- Vercel’s free tier doesn’t sleep, so this is optional for monitoring.

## Deployment
### Vercel (Recommended)
- **Why**: No sleep mode, fast global CDN, seamless Git deployment, ideal for RapidAPI.
- **Steps**:
  1. Sign up at [vercel.com](https://vercel.com).
  2. Connect GitHub repo and deploy.
  3. Add `vercel.json`:
     ```json
     {
       "version": 2,
       "builds": [
         { "src": "src/index.ts", "use": "@vercel/node" }
       ],
       "routes": [
         { "src": "/health", "methods": ["GET"], "dest": "src/index.ts" },
         { "src": "/validate-email", "methods": ["POST"], "dest": "src/index.ts" },
         { "src": "/get-domain", "methods": ["POST"], "dest": "src/index.ts" }
       ]
     }
     ```
  4. Get endpoint: `https://your-api.vercel.app`.



## Contributing
Found a bug or want to add a feature? Open an issue or PR on [your-repo-url]. We welcome contributions to enhance validation rules or add new endpoints!

---

Built with ❤️ by Aditya Kumbhar. Start validating emails and monetizing with RapidAPI today!