//Добавляем плагин multer для работ с формами и файлами в node.js
const multer = require('multer')

//Настраиваем куда будем сохранять файл
const uplodeFormFrom = multer({ dest: '/uploads' })

//Устанавливаем название файла в форме
const fileFromForm = uplodeFormFrom.single('MYFILE')

const WorkerTableUsers = require('../../services/worker-tables/users.js')

/**
 * Маршрут для получения одного пользователя:
 * Автор: Алексей Левада
 * Описание: Возвращает JSON со одним пользователем
 * Версия: v1
 * Метод: POST
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/users/[id пользователя] (:id получение динамических пользователей)
 */

module.exports = (app) => {

   app.post('/users/get/:id', fileFromForm, (req, res) => {
      const ID = req.body.ID
      const workerTableUser = new WorkerTableUsers(req, res)
      workerTableUser.get(ID)
   })

   /**
        * Вспомогательный маршрут для получения одного пользователя из БД
        * Автор: Алексей Левада
        * Описание: Выводит форму для поиска пользователя в БД
        * Версия: v1
        * Метод: GET
        * Пример работы с запросом:
        * Ввести в адресную строку - http://localhost:3000/users/form_get_user
        */

   app.get('/users/form_get_user', (req, res) => {
      res.send(`
         <h1>
            Введите ID пользователя для просмотра 
         <h1/>
         <form method='post' action='/users/get/:id' enctype='multipart/form-data'>
            <input type='text' name='ID' placeholder='Введите ID пользователя'/><br>
            <input type='submit' value='Найти' style='margin-top:15px'/>
         <form>
      `)
   })
}