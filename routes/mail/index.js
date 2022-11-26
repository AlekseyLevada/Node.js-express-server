//Добавляем плагин multer для работ с формами и файлами в node.js
const multer = require('multer')

//Настраиваем куда будем сохранять файл
const uplodeFormFrom = multer({ dest: '/uploads' })

//Устанавливаем название файла в форме
const fileFromForm = uplodeFormFrom.single('MYFILE')

const WorkerForMail = require('../../services/worker-for-mail/index.js')

/**
 * Маршрут для отправки сообщения администратору:
 * Автор: Алексей Левада
 * Описание: Возвращает JSON с результатом отправки письма
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/mail/send/:text
 */



module.exports = (app, connect) => {
    app.post('/mail/send/', fileFromForm, (req, res) => {

        const messageToManager = req.body.TEXT

        const workerForMail = new WorkerForMail(req, res)

        workerForMail.sendMail(messageToManager)

        

        // let transporter = nodeMailer.createTransport({
        //     host: 'smtp.yandex.ru',
        //     port: 465,
        //     secure: 465,
        //     auth: {
        //         user: 'inordic2022',
        //         pass: 'inordic',
        //     }
        // })
        // let mailOptions = {
        //     from: '"inordic"<inordic2022@yandex.ru>',
        //     to: 'aleksey.levada@gmail.com',
        //     subject: 'Тестовое письмо с магазина Inordic',
        //     html: messageToManager
        // }

        // transporter.sendMail(mailOptions, (err, info) => {

        //     err ?
        //         res.send(err)
        //         :
        //         res.send('Письмо отправленно', info.messageId, info.response)
        // })

    })

    /**
  * Вспомогательный маршрут с формой для отпрвки сообщения админисиратору:
  * Автор: Алексей Левада
  * Описание: Возвращает html форму
  * Версия: v1
  * Метод: GET
  * Пример работы с запросом:
  * Ввести в адресную строку - http://localhost:3000/mail/form
  */
    app.get('/mail/form', (req, res) => {
        res.send(
            `<h1>
            Форма для отправки  письма
        </h1>
            <form action='/mail/send' method='post' enctype='multipart/form-data'>
                <textarea 
                type='text' 
                placeholder='Напишите сообщение' 
                name='TEXT'
                cols = 50
                rows = 15
                ></textarea><br>
                <input type='submit' value='Отправить' style="margin-top:25px; padding:10px; font-weight:bold; font-size:14px"/>
            </form>
        `
        )
    })
}