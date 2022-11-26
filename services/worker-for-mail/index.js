// Отправляет почтовое сообщение

module.exports = class WorkerForMail {

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
    #transport
    req
    res

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
        this.req = this.req
        this.res = res
    }
}