import nodemailer from "nodemailer"
import logger from "./logger"

export interface EmailOptions {
    from: string
    to: string | string[]
    subject: string
    body: string
}

const transport = nodemailer.createTransport({
    service: "smtp@gmail.com",
    port: 465,
    secure: true,
    tls: {
        rejectUnauthorized: false
    }, 

    auth: {
        type: "OAuth2",

    }
})

const publishEmail = (
    email: string,
    subject: string,
    body: string,
    ctaLink: string,
    buttonText: string
): void => {
    
    const emailOptions: EmailOptions = {
        from: 'admin', // temp
        to: email,
        subject,
        body 
    }

    

}

export default publishEmail