Security guidance for the Femmora project

High level recommendations

1. Secrets & API keys
- Never commit .env or any file containing secrets to source control. Use `.env.example` for documentation.
- For any API keys that must remain private (production Gemini keys), do not expose them to the client bundle. Instead, host a small server-side proxy or serverless function that signs requests.

2. Authentication & Storage
- Do NOT store sensitive user information (PII or health-related data) in localStorage in production. Use secure, HttpOnly cookies or a trusted backend session store.

3. Transport & Encryption
- Ensure HTTPS is enabled in production (TLS). All requests to third-party APIs should use HTTPS.

4. Input validation & error handling
- Validate all user input on the server side (Zod/Joi for Node; Pydantic for Python).
- Implement global error handling and do not leak stack traces to users.

Quick checklist for maintainers
- Add real secrets to CI/CD secrets manager (GitHub Actions secrets, Vercel/Netlify env UI, etc.).
- Rotate keys if they're accidentally committed.
- Add monitoring/alerts for suspicious usage of API credentials.
