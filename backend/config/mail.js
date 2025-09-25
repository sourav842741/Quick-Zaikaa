import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user:process.env.EMAIL,
    pass:process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, otp) => {
  await transporter.sendMail({
    from: `${process.env.EMAIL}`,
    to,
    subject: "🔒 Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 30px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); padding: 25px; text-align: center;">
          
          <h2 style="color: #2d3748; margin-bottom: 10px;">Password Reset Request</h2>
          <p style="color: #4a5568; font-size: 15px; margin-bottom: 20px;">
            You requested to reset your password. Use the OTP below to continue. 
            This OTP is valid for <b>5 minutes</b>.
          </p>

          <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #2b6cb0; margin: 20px 0; padding: 12px 20px; border: 2px dashed #2b6cb0; display: inline-block; border-radius: 8px;">
            ${otp}
          </div>

          <p style="color: #718096; font-size: 14px; margin-top: 25px;">
            If you did not request this, please ignore this email or contact support immediately.
          </p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;">

          <p style="color: #a0aec0; font-size: 12px;">
            © ${new Date().getFullYear()} Quick Zaikaa. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });
};


export const sendOtpToUser = async (user, otp) => {
  
 await transporter.sendMail({
  from: `${process.env.EMAIL}`,
  to: user.email,
  subject: "📦 Your Delivery OTP",
  html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 30px;">
      <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); padding: 25px; text-align: center;">

        <h2 style="color: #2d3748; margin-bottom: 10px;">Delivery Verification</h2>
        <p style="color: #4a5568; font-size: 15px; margin-bottom: 20px;">
          Hello <b>${user.fullName}</b>,<br>
          Please use the OTP below to verify your delivery. <br>
          This OTP will expire in <b>5 minutes</b>.
        </p>

        <div style="font-size: 26px; font-weight: bold; letter-spacing: 4px; color: #e53e3e; margin: 20px 0; padding: 14px 24px; border: 2px dashed #e53e3e; display: inline-block; border-radius: 8px;">
          ${otp}
        </div>

        <p style="color: #718096; font-size: 14px; margin-top: 25px;">
          If you didn’t request this delivery OTP, please ignore this email.
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;">

        <p style="color: #a0aec0; font-size: 12px;">
          © ${new Date().getFullYear()} Quick Zaikaa. All rights reserved.
        </p>
      </div>
    </div>
  `,
});


  console.log("✅ OTP sent to:", user.email, "OTP:", otp);
};

export default sendMail