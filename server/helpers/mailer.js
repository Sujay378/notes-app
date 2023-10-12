const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const templates = {
  reset: `<p>Hi <b>[name]</b>,</p>
  <p>Here is your password reset link.</p>
  <a type="button" style="background-color: purple; color: white;" src="[link]">Reset Link</a>`,
};

const handlers = {
  reset: ({ name, link }) =>
    templates.reset.replace("[name]", name).replace("[link]", link),
};

const sendMail = async (type, config) => {
  try {
    const mailTemplate = handlers[type](config);
    await transporter.sendMail({
      from: "<notes-app> simulate.admin@notes.com",
      to: config.email,
      subject: "Password reset link",
      html: mailTemplate,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMail };
