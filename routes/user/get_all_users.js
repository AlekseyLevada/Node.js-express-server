/**
 * Маршрут для получения всех пользователей:
 * Автор: Алексей Левада
 * Описание: Возвращает JSON со списком всех пользователей
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/users/get
 */

const WorkerTableUsers = require('../../services/worker-tables/users.js')

module.exports = (app) => {
    app.get('/users/get', (req, res) => {

        //console.log(WorkerTableUsers)

        //res.send(`Получение всех пользователей`)

        //Создадим экземпляр вспомогательного класса 

        const workerTableUsers = new WorkerTableUsers(req, res)

        workerTableUsers.getAll()
    })
}
