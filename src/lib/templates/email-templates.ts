export const emailLayout = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #000; padding: 20px; text-align: center; }
    .logo { color: #fff; font-size: 24px; font-weight: bold; text-decoration: none; }
    .content { padding: 30px 20px; background-color: #fff; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; background-color: #f5f5f5; }
    .button { display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
    h1 { color: #111; font-size: 24px; margin-bottom: 20px; }
    p { margin-bottom: 16px; font-size: 16px; }
    .info-box { background-color: #f0f9ff; border-left: 4px solid #0284c7; padding: 15px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <a href="https://apnisec.com" class="logo">ApniSec</a>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} ApniSec. All rights reserved.<br>
      Securing your digital world.
    </div>
  </div>
</body>
</html>
`;

export const welcomeTemplate = (name: string) => emailLayout(`
  <h1>Welcome to ApniSec, ${name}!</h1>
  <p>We are thrilled to have you on board. ApniSec is your partner in advanced cybersecurity solutions.</p>
  <p>Your account has been successfully created. You can now access your dashboard to manage security assessments and track issues.</p>
  <center>
    <a href="http://localhost:3000/dashboard" class="button">Go to Dashboard</a>
  </center>
`);

export const issueNotificationTemplate = (title: string, userEmail: string, description: string, type: string) => emailLayout(`
  <h1>New Issue Reported</h1>
  <p>A new security issue has been reported by <strong>${userEmail}</strong>.</p>
  
  <div class="info-box">
    <p><strong>Type:</strong> ${type}</p>
    <p><strong>Title:</strong> ${title}</p>
    <p><strong>Description:</strong><br>${description}</p>
  </div>
  
  <p>Please review this issue in the dashboard immediately.</p>
  <center>
    <a href="http://localhost:3000/dashboard" class="button">View Issue</a>
  </center>
`);

export const profileUpdateTemplate = (name: string) => emailLayout(`
  <h1>Profile Updated</h1>
  <p>Hi ${name},</p>
  <p>This email is to confirm that your profile information on ApniSec has been successfully updated.</p>
  <p>If you did not make this change, please contact support immediately.</p>
  <center>
    <a href="http://localhost:3000/profile" class="button">Check Profile</a>
  </center>
`);
