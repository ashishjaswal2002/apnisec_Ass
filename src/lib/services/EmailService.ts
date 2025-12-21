import { Resend } from 'resend';
import { welcomeTemplate, issueNotificationTemplate, profileUpdateTemplate } from '../templates/email-templates';

export class EmailService {
    private resend: Resend;
    private readonly fromEmail = 'onboarding@resend.dev'; // Recommended for testing

    constructor() {
        // Provide a fallback for build time/local dev if env var is missing
        const apiKey = process.env.RESEND_API_KEY || 're_123456789_placeholder_for_build';
        this.resend = new Resend(apiKey);
    }

    async sendWelcomeEmail(to: string, name: string): Promise<void> {
        if (process.env.RESEND_API_KEY) {
            try {
                await this.resend.emails.send({
                    from: this.fromEmail,
                    to,
                    subject: 'Welcome to ApniSec',
                    html: welcomeTemplate(name),
                });
            } catch (error) {
                console.error('Failed to send welcome email:', error);
            }
        }
    }

    async sendIssueNotification(to: string, issueTitle: string, userEmail: string, description: string = '', type: string = 'Issue'): Promise<void> {
        if (process.env.RESEND_API_KEY) {
            try {
                await this.resend.emails.send({
                    from: this.fromEmail,
                    to,
                    subject: `New Issue: ${issueTitle}`,
                    html: issueNotificationTemplate(issueTitle, userEmail, description, type),
                });
            } catch (error) {
                console.error('Failed to send issue notification:', error);
            }
        }
    }

    async sendProfileUpdateNotification(to: string, name: string): Promise<void> {
        if (process.env.RESEND_API_KEY) {
            try {
                await this.resend.emails.send({
                    from: this.fromEmail,
                    to,
                    subject: 'Profile Updated - ApniSec',
                    html: profileUpdateTemplate(name),
                });
            } catch (error) {
                console.error('Failed to send profile update notification:', error);
            }
        }
    }
}
