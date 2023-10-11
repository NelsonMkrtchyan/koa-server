import MailService from '@sendgrid/mail';

const sendgrid_api_key = process.env.SENDGRID_API_KEY || '';
MailService.setApiKey(sendgrid_api_key);

type ForgotPasswordTemplateType = {
    firstName: string,
    lastName: string,
    code: string
}
type SendEmailType = {
    email: string,
    subject?: string,
    user: {
        firstName: string,
        lastName: string,
        totpCode: string
    }
}

const RESET_PASSWORD = 'VENEWS - Reset Password';
const forgotPasswordTemplate = ({firstName, lastName, code}: ForgotPasswordTemplateType) => {
  return {
    html: `
        Hello ${firstName} ${lastName},
        <br/><br/>
        Please, use this verification code <b>${code}</b> to reset your password in order to be able to log in.
        <br/><br/>
        Have a great day!
        `,
  };
};
export const sendEmail = async ({email, subject = RESET_PASSWORD, user}: SendEmailType) => {
  const {firstName, lastName, totpCode: code} = user;
  const content = forgotPasswordTemplate({firstName, lastName, code});
  const sender_email = process.env.SENDER_EMAIL || '';
  const template_id = process.env.TEMPLATE_ID || '';
  return await MailService.send({
    to: email,
    from: sender_email,
    templateId: template_id,
    dynamicTemplateData: {subject, message: content.html},
  });
};

