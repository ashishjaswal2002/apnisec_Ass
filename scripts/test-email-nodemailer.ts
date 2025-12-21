import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Explicitly load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

if (!smtpUser || !smtpPass) {
    console.error(" SMTP Credentials missing. Please set SMTP_USER and SMTP_PASS in .env");
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtpUser,
        pass: smtpPass,
    },
});

const recipient = process.argv[2];

if (!recipient) {
    console.error("Usage: npx tsx scripts/test-email-nodemailer.ts <recipient-email>");
    process.exit(1);
}

console.log(`📧 Attempting to send email via Gmail (${smtpUser}) to: ${recipient}`);

async function sendTestEmail() {
    try {
        const info = await transporter.sendMail({
            from: `"ApniSec Test" <${smtpUser}>`,
            to: recipient,
            subject: 'ApniSec via Nodemailer',
            html: '<strong>It works!</strong><p>This email was sent using Nodemailer and Gmail.</p>'
        });

        console.log("✅ Email sent successfully!");
        console.log("Message ID:", info.messageId);
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error("❌ Nodemailer Error:", error);
    }
}

sendTestEmail();
