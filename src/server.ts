// imports..
import env from "dotenv"
import express, { Request, Response } from 'express'
import { PrismaClient } from "@prisma/client"
import { validateEmail } from "./util"
// @ts-ignore
import cors from "cors"

// send email
import { sendEmail } from "./subscription/email.subscription"


// app
const app = express()

// middlewares
app.use(express.json())
app.use(
    cors({
        origin: "*"
    })
)

// prisma client
const prisma = new PrismaClient()

// routes...
app.post("/api/subscribe/email", async (req: Request, res: Response) => {

    // queries
    async function main() {
        // checking if the email is already exists
        let all_emails = await prisma.emails.findMany() 
        let emailContainEmail: boolean = false;  // will return false if user doesn't exists and return true if user exists 
        for (let i = 0, len=all_emails.length; i < len; i++) {
            // looping through ...
            if (all_emails[i].email.indexOf(req.body.mail) > -1)
            {
                emailContainEmail = true;
                break;
            }
        }

        // if doesn't ..
        // @ts-ignore
        if (!emailContainEmail) {
            // validate email
                // @ts-ignore
                // adding user to the database
                const newSubscr = await prisma.emails.create({
                    data: {
                        // ts-ignore
                        email: req.body.mail,
                    },
                })

                // sending email to the user that just've got registered
                await sendEmail(req.body.mail)

                // success
                return res.status(200).json({ message: "added email to the database successfully"})
        } 
        else {
            // user exists
            return res.status(201).json({ message: "User already exist"})
        }
    }
    main()
        .catch((e) => {
            // errors...
            console.log("Error: " + e)
        })
        .finally(async () => {
            await prisma.$disconnect()
        })
})

// running server
app.listen(3000, () => console.log("Server is running!"))