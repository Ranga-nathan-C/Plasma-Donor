const nodemailer = require("nodemailer");

// Email Sending Function
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "s.gowtham.engr@gmail.com",
      pass: "tdog iwfn rhdn gkte", // Use the generated App Password
    },
  });

  const mailOptions = {
    from: "s.gowtham.engr@gmail.com",
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email Error:", error);
  }
};

module.exports = { sendEmail };
