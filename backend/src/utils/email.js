import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
};

export const sendOrderConfirmationEmail = async (order, userEmail) => {
  const subject = `Order Confirmation - ${order.orderNumber}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Order Confirmed!</h2>
      <p>Thank you for your order. Your order number is: <strong>${order.orderNumber}</strong></p>
      <p>Total Amount: ₹${order.finalAmount}</p>
      <p>We will send you another email when your order ships.</p>
    </div>
  `;

  return await sendEmail(userEmail, subject, html);
};

export const sendOrderStatusUpdateEmail = async (order, userEmail) => {
  const subject = `Order Update - ${order.orderNumber}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Order Status Update</h2>
      <p>Your order <strong>${order.orderNumber}</strong> status has been updated to: <strong>${order.status}</strong></p>
    </div>
  `;

  return await sendEmail(userEmail, subject, html);
};

