// notification.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure Nodemailer for sending email notifications
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.APP_PASSWORD, // Your App Password (not your actual Gmail password)
  },
});

// Function to send a notification email
export const sendNotification = (email, subject, message) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.EMAIL, // Fixed sender email
        to: email,
        subject: subject,
        text: message,
      },
      (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info.response);
        }
      }
    );
  });
};
