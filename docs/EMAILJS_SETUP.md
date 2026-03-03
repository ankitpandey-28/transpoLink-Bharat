# EmailJS Setup Guide for TranspoLink Contact Form

## What is EmailJS?
EmailJS is a service that allows you to send emails directly from JavaScript without needing a backend server. It's perfect for contact forms like the one we just implemented.

## Step-by-Step Setup

### 1. Create EmailJS Account
- Go to [https://www.emailjs.com](https://www.emailjs.com)
- Click "Sign Up" and create a free account
- Verify your email address

### 2. Get Your User ID
- After logging in, go to your dashboard
- Copy your **User ID** (it looks like: `user_abc123xyz`)

### 3. Create an Email Service
- In your dashboard, go to "Email Services"
- Click "Add New Service"
- Choose "Gmail" (or your preferred email provider)
- Connect your Gmail account (transpolinkbharat@gmail.com)
- Copy the **Service ID** (it looks like: `service_abc123`)

### 4. Create an Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Use this template content:

**Subject:**
```
New Contact Form Message from {{from_name}}
```

**Email Body:**
```
Hello TranspoLink Team,

You have received a new message from your website contact form:

**Name:** {{from_name}}
**Email:** {{from_email}}
**Phone:** {{from_phone}}
**Subject:** {{subject}}

**Message:**
{{message}}

---
This message was sent from your website contact form.
You can reply directly to: {{reply_to}}
```

- Save the template and copy the **Template ID** (it looks like: `template_abc123`)

### 5. Update Your Code
Your EmailJS credentials have been configured in `src/pages/Contact.js`:

```javascript
// Your EmailJS API Key
emailjs.init("2fMfEdV1W1q1ppGO-");

// Your Service ID and Template ID
const response = await emailjs.send(
  'service_q2z0fp6', // Your Service ID
  'template_97xp7qn', // Your Template ID
  templateParams
);
```

### 6. Test the Form
- Start your development server: `npm start`
- Go to the Contact page
- Fill out and submit the form
- Check your email (transpolinkbharat@gmail.com) for the message

## Important Notes

- **Free Plan Limits**: EmailJS free plan allows 200 emails per month
- **Email Delivery**: Emails may take a few minutes to arrive
- **Spam Filter**: Check your spam folder if emails don't appear
- **Security**: EmailJS handles email sending securely

## Troubleshooting

- **"Failed to send message"**: Check your User ID, Service ID, and Template ID
- **No emails received**: Verify your email service connection
- **Form not working**: Check browser console for error messages

## Remove Setup Note
After successful setup, remove the blue setup note box from the Contact page by deleting this section:

```javascript
{/* EmailJS Setup Note - Remove this after setup */}
<div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
  // ... setup instructions ...
</div>
```

## Support
If you need help with EmailJS setup, visit their [documentation](https://www.emailjs.com/docs/) or contact their support team.

