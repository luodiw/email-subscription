// @ts-ignore
import mail from 'nodemailer'
// @ts-ignore
import schedule from 'node-schedule'
// ....
import { PrismaClient } from "@prisma/client"


// prisma client
const prisma = new PrismaClient()

async function sendEmail(email: string) {
  // create reusable transporter object 
  let transporter = mail.createTransport({
    service: "gmail",
    auth: {
      user: "269hdksk666xf2@gmail.com", // generated ethereal user
      pass: "scncoccqoxdetero", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "269hdksk666xf2@gmail.com", // sender address
    to: email, // list of receivers
    subject: "", // Subject line
    text: "", // plain text body
  });

  console.log("Message sent: %s", info.messageId);

}

// exporting so we can use the function
export { sendEmail }