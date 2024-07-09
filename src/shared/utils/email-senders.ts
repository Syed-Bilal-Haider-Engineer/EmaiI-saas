'use server'
import * as AWS from 'aws-sdk';
import * as nodemails from 'nodemailer';

interface Props {
    userEmail: [],
    subject: string,
    context: string
}

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-south-1",
});
AWS.config.getCredentials(function (error) {
    if (error) {
        console.log(error.stack);
    }
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });
const adminMail = "billshahbscs@gmail.com";
// Create a transporter of nodemailer
const transporter = nodemails.createTransport({
    SES: ses,
});
export const testMail = async (userEmail: Props) => {
    try {
        const response:any = await transporter.sendMail({
            from: adminMail,
            to: userEmail.userEmail,
            subject: userEmail.subject,
            html: userEmail.context
        });
        return response?.messageId
            ? { ok: true }
            : { ok: false, msg: "Failed to send email" };
    } catch (error:any) {
        console.log("ERROR", error.message);
        return { ok: false, msg: "Failed to send email" };
    }
};