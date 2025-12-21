import nodemailer from 'nodemailer';
import { welcomeTemplate, issueNotificationTemplate, profileUpdateTemplate } from '../templates/email-templates';

export class EmailService {
    private transporter: nodemailer.Transporter;
    private readonly fromEmail: string;

    constructor() {
        this.fromEmail = process.env.SMTP_USER || 'noreply@apnisec.com';

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async sendWelcomeEmail(to: string, name: string): Promise<void> {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn('SMTP credentials missing. Email skipped.');
            return;
        }

        try {
            await this.transporter.sendMail({
                from: `"ApniSec" <${this.fromEmail}>`,
                to,
                subject: 'Welcome to ApniSec',
                html: welcomeTemplate(name),
            });
            console.log(`Welcome email sent to ${to}`);
        } catch (error) {
            console.error('Failed to send welcome email:', error);
        }
    }

    async sendIssueNotification(to: string, issueTitle: string, userEmail: string, description: string = '', type: string = 'Issue'): Promise<void> {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            return;
        }

        try {
            await this.transporter.sendMail({
                from: `"ApniSec" <${this.fromEmail}>`,
                to,
                subject: `New Issue: ${issueTitle}`,
                html: issueNotificationTemplate(issueTitle, userEmail, description, type),
            });
            console.log(`Issue notification sent for ${issueTitle}`);
        } catch (error) {
            console.error('Failed to send issue notification:', error);
        }
    }

    async sendProfileUpdateNotification(to: string, name: string): Promise<void> {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            return;
        }

        try {
            await this.transporter.sendMail({
                from: `"ApniSec" <${this.fromEmail}>`,
                to,
                subject: 'Profile Updated - ApniSec',
                html: profileUpdateTemplate(name),
            });
            console.log(`Profile update email sent to ${to}`);
        } catch (error) {
            console.error('Failed to send profile update notification:', error);
        }
    }
}
