//Добавляем плагин multer для работ с формами и файлами в node.js
const multer = require('multer')

//Настраиваем куда будем сохранять файл
const uplodeFormFrom = multer({ dest: '/uploads' })

//Устанавливаем название файла в форме
const fileFromForm = uplodeFormFrom.single('MYFILE')

const WorkerTableUsers = require('../../services/worker-tables/users.js')

module.exports = (app) => {

/**
 * Маршрут для удаления пользователя:
 * Автор: Алексей Левада
 * Описание: Возвращает сообщение с успешным удалением пользователя из БД
 * Версия: v1
 * Метод: POST
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/users/del
 */

    app.post('/users/del', fileFromForm, (req, res) => {
        const id = req.body.ID
        const workerTableUsers = new WorkerTableUsers(req, res)
        workerTableUsers.delete(id)
    })

    /**
     * Вспомогательный маршрут для удаления пользователя:
     * Автор: Алексей Левада
     * Описание: Возвращает форму для удаления пользователя из БД
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/users/form_del_user
     */

    app.get('/users/form_del_user', (req, res) => {
        res.send(`
        <h1>
            Введите ID пользователя для удаления
        </h1>
        <form method='post' action='/users/del' enctype='multipart/form-data'>
        <input type='text' placeholder='ID пользователя' name='ID'/>
        <input type='submit' value='Удалить'/>
        </form>
        `)
    })
}