//Добавляем плагин multer для работ с формами и файлами в node.js
const multer = require('multer')

//Настраиваем куда будем сохранять файл
const uplodeFormFrom = multer({ dest: '/uploads' })

//Устанавливаем название файла в форме
const fileFromForm = uplodeFormFrom.single('MYFILE')

const WorkerTabelGoods = require('../../services/worker-tables/goods.js')

module.exports = (app) => {

   /**
 * Маршрут для получения одного товара:
 * Автор: Алексей Левада
 * Описание: Возвращает JSON со одним товаром
 * Версия: v1
 * Метод: POST
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/goods/get/:id
 */

   app.post('/goods/get/:id', fileFromForm, (req, res) => {
      const ID = req.body.ID
      new WorkerTabelGoods(req, res).get(ID)
   })

   /**
     * Вспомогательный маршрут для получения одного товара из БД
     * Автор: Алексей Левада
     * Описание: Выводит форму для поиска товара в БД
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/goods/form_get_good
     */

   app.get('/goods/form_get_good', (req, res) => {
      res.send(`
            <h1>
               Введите ID товара для просмотра 
            <h1/>
            <form method='post' action='/goods/get/:id' enctype='multipart/form-data'>
               <input type='text' name='ID' placeholder='Введите ID товара'/><br>
               <input type='submit' value='Найти' style='margin-top:15px'/>
            <form>
         `)
   })
}