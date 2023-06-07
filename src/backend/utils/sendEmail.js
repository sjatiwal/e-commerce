const sgMail = require("@sendgrid/mail");

const sendEmail = async (options) => {
  sgMail.setApiKey(process.env.SendGrid_API_KEY);

  const message = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    // const resp =
    await sgMail.send(message);
  } catch (error) {
    console.log("sendEmail", error.response.body);
  }
};

module.exports = sendEmail;
