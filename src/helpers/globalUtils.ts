const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const saltRounds = 10;
export class GlobalUtils {
  public static encryptPassword = async (password: string) => {
    const encryptedPassword = await bcrypt.hash(
      process.env.ENCRYPT_PASSWORD_STRING,
      saltRounds
    );
    return encryptedPassword;
  };

  public static comparePassword = async (encyptedPassword: string) => {
    const isPasswordCorrect = await bcrypt.compare(
      process.env.ENCRYPT_PASSWORD_STRING,
      encyptedPassword
    );
    return isPasswordCorrect;
  };

  public static generateToken = async (data: any) => {
    return jwt.sign(data, process.env.TOKEN_SECRET_KEY);
  };

  public static sendMail(data: any) {
    const transport = nodemailer.createTransport({
      name: process.env.SMTP_HOST,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER_NAME,
        pass: process.env.SMTP_PASSWORD,
      },
      pool: true, // use pooled connection
      rateLimit: true, // enable to make sure we are limiting
      maxConnections: 1, // set limit to 1 connection only
      maxMessages: 3, // send 3 emails per second
    });

    var mailOptions = {
      from: process.env.FROM,
      html: data.html,
      replyTo: process.env.REPLY_TO,
      to: data.to,
      subject: data.subject,
      text: data.text,
    };
    transport.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      return;
    });
  }
}
