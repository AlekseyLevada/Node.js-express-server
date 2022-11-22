//Добавляем плагин multer для работ с формами и файлами в node.js
const multer = require('multer')

//Настраиваем куда будем сохранять файл
const uplodeFormFrom = multer({ dest: '/uploads' })

//Устанавливаем название файла в форме
const fileFromForm = uplodeFormFrom.single('MYFILE')

const WorkerTableUsers = require('../../services/worker-tables/users')

module.exports = (app) => {
    app.post('/users/edit', fileFromForm, (req, res) => {
        const data = {
            'ID': req.body.ID,
            'NAME': req.body.NAME,
            'SURNAME': req.body.SURNAME,
            'EMAIL': req.body.EMAIL,
            'IMG': req.body.IMG,
            'PHONE': req.body.PHONE,
            'LOGIN': req.body.LOGIN,
            'PASSWORD': req.body.PASSWORD,
            'ROLE': req.body.ROLE,
        }

        const workerTableUsers = new WorkerTableUsers(req, res)

        workerTableUsers.update(data)
    })
    /**
     * Вспомогательный маршрут для редактирования пользователя в БД
     * Автор: Алексей Левада
     * Описание: Выводить форму для редактирования пользователя в БД
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/users/form_edit_user
     */
    
    app.get('/users/form_edit_user', (req, res) => {
        res.send(
            `<h1>
            Форма для редактирования пользователя
        </h1>
            <form action='/users/edit' method='post' enctype='multipart/form-data'>
                <input style='margin-top:20px' type='text' name='ID' placeholder ='ID'/><br>
                <input style='margin-top:20px' type='text' name='NAME' placeholder ='NAME'/><br>
                <input style='margin-top:20px' type='text' name='SURNAME' placeholder ='SURNAME'/><br>
                <input style='margin-top:20px' type='text' name='IMG' placeholder ='IMG'/><br>
                <input style='margin-top:20px' type='text' name='EMAIL' placeholder ='EMAIL'/><br>
                <input style='margin-top:20px' type='text' name='PHONE' placeholder ='PHONE'/><br>
                <input style='margin-top:20px' type='text' name='LOGIN' placeholder ='LOGIN'/><br>
                <input style='margin-top:20px' type='text' name='PASSWORD' placeholder ='PASSWORD'/><br>
                <input style='margin-top:20px' type='text' name='ROLE' placeholder ='ROLE'/><br>
                <input type='submit' value='Изменить' style='margin-top:20px'/>
            </form>
        `
        )
    })
}