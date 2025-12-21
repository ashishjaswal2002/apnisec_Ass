import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';

// Explicitly load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
    console.error("RESEND_API_KEY is missing from .env");
    process.exit(1);
}

const resend = new Resend(apiKey);
const recipient = process.argv[2];

if (!recipient) {
    console.error("Usage: npx tsx scripts/test-email.ts <recipient-email>");
    process.exit(1);
}

console.log(`📧 Attempting to send email to: ${recipient}`);
console.log(`Using API Key starting with: ${apiKey.substring(0, 5)}...`);

async function sendTestEmail() {
    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: recipient,
            subject: 'ApniSec Test Email',
            html: '<strong>It works!</strong><p>This is a test email from your ApniSec application.</p>'
        });

        if (data.error) {
            console.error("Resend API Error:", data.error);
        } else {
            console.log(" Email sent successfully!", data);
        }
    } catch (error) {
        console.error(" Script Error:", error);
    }
}

sendTestEmail();
