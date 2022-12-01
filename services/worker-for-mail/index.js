// Отправляет почтовое сообщение

module.exports = class WorkerForMail {
    #transport
    req 
    res

    #nodemailer = require('nodemailer')

    #configuration = {
        host: 'smtp.yandex.ru',
        port: 465,
        secure: 465,
        auth: {
            user: 'inordic2022',
            pass: 'inordic',
        }
    }

    #createTransporter() {
        //console.log(`NODEMAILER`, this.#nodemailer)
        return this.#nodemailer.createTransport(this.#configuration)
    }

    #mailOptions = {
        from: '"inordic"<inordic2022@yandex.ru>',
        to: 'aleksey.levada@gmail.com',
        subject: 'Тестовое письмо с магазина Inordic',
        html: ''
    }

    sendMail(text) {
        this.#mailOptions.html = text

        this.#transport.sendMail(this.#mailOptions, (err, info) => {
            err ?
                this.res.send(err)
                :
                this.res.send('Письмо отправленно', info.messageId, info.response)
        })
    }

    constructor(req, res) {
        this.#transport = this.#createTransporter()
        this.req = req
        this.res = res
    }
}