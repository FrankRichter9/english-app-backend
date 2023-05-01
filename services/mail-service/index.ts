import nodemailer from 'nodemailer'

class Service {
    transporter: nodemailer.Transporter<{}>

    constructor() {
        this.transporter = nodemailer.createTransport({
            //@ts-expect-error
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на сайте' + process.env.API_URL,
            text: '',
            html: `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}" >${link}</a>
                </div>
            `
        })
    }
}

export const MailService = new Service()