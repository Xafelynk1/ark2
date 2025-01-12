const nodemailer = require('nodemailer');

// Nodemailer setup
console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

// Function to send a test email
const sendTestEmail = (email) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Test Email',
        text: 'This is a test email to verify the email sending functionality.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Test email sent:', info.response);
        }
    });
};

// Send a test email
sendTestEmail('test@example.com'); // Replace with a valid email address for testing
