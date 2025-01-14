"use server"
import nodemailer from "nodemailer";

export async function sendEmail({ email, subject, message }: { email: string; subject: string; message: string }) {
    if (!email || !subject || !message) {
      throw new Error("Missing required fields");
    }
  
    // Replace with your SMTP configuration
    const transporter = nodemailer.createTransport({
      host: "mail.mazenschools.edu.pk", // e.g., "smtp.gmail.com"
      port: 465, // Use 465 for secure, 587 for TLS
      secure: true, // true for port 465, false for others
      auth: {
        user: "mazenconnect@mazenschools.edu.pk", // Your SMTP username
        pass: "Mazen@Connect1234", // Your SMTP password
      },
    });
  
    await transporter.sendMail({
      from: '"Mazen Connect" <mazenconnect@mazenschools.edu.pk>', // Sender's email
      to: email, // Recipient's email
      subject: subject, // Email subject
      text: message, // Email body as plain text
    });
  }