const WorkerTableUsers = require('../../services/worker-tables/users.js')

/**
 * Маршрут для получения одного пользователя:
 * Автор: Алексей Левада
 * Описание: Возвращает JSON со одним пользователем
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/users/[id пользователя] (:id получение динамических пользователей)
 */

module.exports = (app) => app.get('/users/get/:id', (req, res) => {

   // Получить данные из параметра в консоли

   //console.log(req)

   const {id} = req.params

  // console.log('id пользователя', id)

   const workerTableUser = new WorkerTableUsers(req, res)

   workerTableUser.get(id)
})