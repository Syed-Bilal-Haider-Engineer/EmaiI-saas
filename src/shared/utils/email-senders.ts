'use server'
import * as AWS from 'aws-sdk';
import * as nodemails from 'nodemailer';

interface Props {
    userEmail: string[],
    subject: string,
    content: string
}

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
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
export const sendMail = async ( {userEmail, subject, content }: Props) => {
    try {
        const response:any = await transporter.sendMail({
            from: adminMail,
            to: userEmail,
            subject: subject,
            html: content
        });
        return response?.messageId
            ? { ok: true }
            : { ok: false, msg: "Failed to send email" };
    } catch (error:any) {
        console.log("ERROR", error.message);
        return { ok: false, msg: "Failed to send email" };
    }
};