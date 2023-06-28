const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Configure body-parser middleware
app.use(bodyParser.json());

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'marlonbbusiness@gmail.com', // Your Gmail email address
    pass: 'pyjanrolrjylfqvg' // Your Gmail password
  }
});

// Define a route for sending emails
app.post('/send-email', (req, res) => {
  const { email,body } = req.body;

  const mailOptions = {
    from: 'marlonbbusiness@gmail.com',
    to: email,
    subject: 'Sign Up',
    html: body 
  };

  // Send the email using the configured transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred while sending email:', error);
      res.status(500).send('An error occurred while sending the email.');
    } else {
      console.log('Email sent successfully:', info.response);
      res.send('Email sent successfully.');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
