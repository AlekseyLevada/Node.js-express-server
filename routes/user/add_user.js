//Добавляем плагин multer для работ с формами и файлами в node.js
const multer = require('multer')

//Настраиваем куда будем сохранять файл
const uplodeFormFrom = multer({ dest: '/uploads' })

//Устанавливаем название файла в форме
const fileFromForm = uplodeFormFrom.single('MYFILE')

// Установка плагина который генерирует случайные ID
const uuid = require('uuid')

const WorkerTableUsers = require('../../services/worker-tables/users')

module.exports = (app) => {
    app.post('/users/add', fileFromForm, (req, res) => {
        const data = {
            'ID': uuid.v4(),
            'NAME': req.body.NAME,
            'SURNAME': req.body.SURNAME,
            'EMAIL': req.body.EMAIL,
            'IMG': req.body.IMG,
            'PHONE': req.body.PHONE,
            'LOGIN': req.body.LOGIN,
            'PASSWORD': req.body.PASSWORD,
            'ROLE': req.body.ROLE,
        }

        
        const workerTableUser = new WorkerTableUsers(req, res)

        workerTableUser.add(data)

        // const id = uuid.v4()
        // const name = req.body.NAME
        // const surname = req.body.SURNAME
        // const email = req.body.EMAIL
        // const img = req.body.IMG
        // const phone = req.body.PHONE
        // const login = req.body.LOGIN
        // const password = req.body.PASSWORD
        // const role = req.body.ROLE


        // //Сгенерировать запрос на добавление товаров в БД

        // const sql = 'INSERT INTO `users` (`ID`,`NAME`,`SURNAME`,`EMAIL`,`IMG`,`PHONE`,`LOGIN`,`PASSWORD`,`ROLE`) VALUES ("' + id + '","' + name + '","' + surname + '","' + email + '","' + img + '","' + phone + '","' + login + '","' + password + '","' + role + '")'

        // connect.query(sql, (err, result) => {
        //     result.message = 'Пользователь добавлен'
        //     err ? res.send(err) : res.send(JSON.stringify(result))
        // })
    })

    /**
     * Вспомогательный маршрут для добавления пользователя в БД
     * Автор: Алексей Левада
     * Описание: Выводить форму для добавления пользователя в БД
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/form_add_user
     */

    app.get('/users/form_add_user', (req, res) => {
        res.send(
            `<h1>
            Форма для добавления пользователя
        </h1>
            <form action='/users/add' method='post' enctype='multipart/form-data'>
                <input type='text' name='NAME' placeholder ='NAME'/>
                <input type='text' name='SURNAME' placeholder ='SURNAME'/>
                <input type='text' name='IMG' placeholder ='IMG'/>
                <input type='text' name='EMAIL' placeholder ='EMAIL'/>
                <input type='text' name='PHONE' placeholder ='PHONE'/>
                <input type='text' name='LOGIN' placeholder ='LOGIN'/>
                <input type='text' name='PASSWORD' placeholder ='PASSWORD'/>
                <input type='text' name='ROLE' placeholder ='ROLE'/>
                <input type='submit' value='Добавить'/>
            </form>
        `
        )
    })
}