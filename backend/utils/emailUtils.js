const nodemailer = require('nodemailer');
const logger = require('./logger');

// Create transporter with more secure settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD // This should be an App Password for Gmail
  },
  tls: {
    rejectUnauthorized: false // Only for development
  }
});

const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    // Verify transporter configuration
    await transporter.verify();
    
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    
    const mailOptions = {
      from: '"Amazing Support" <' + process.env.EMAIL_USER + '>',
      to: email,
      subject: 'Şifre Sıfırlama İsteği',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #0F1111; font-size: 24px; margin-bottom: 20px;">Şifre Sıfırlama İsteği</h1>
          <p style="color: #333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:</p>
          
          <a href="${resetUrl}" 
             style="display: inline-block; 
                    background-color: #FFD814; 
                    color: #0F1111; 
                    text-decoration: none;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-weight: 500;
                    font-size: 14px;
                    border: none;
                    box-shadow: none;
                    margin: 20px 0;">
            Şifremi Sıfırla
          </a>
          
          <p style="color: #666; font-size: 14px; margin-top: 20px;">Bu link 1 saat süreyle geçerlidir.</p>
          <p style="color: #666; font-size: 14px;">Eğer bu isteği siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            © ${new Date().getFullYear()} Amazing. Tüm hakları saklıdır.
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Password reset email sent to ${email}`, { messageId: info.messageId });
    
    return true;
  } catch (error) {
    logger.error('Email sending failed:', {
      error: error.message,
      stack: error.stack,
      email
    });
    throw new Error('E-posta gönderimi başarısız oldu: ' + error.message);
  }
};

module.exports = { sendPasswordResetEmail };
