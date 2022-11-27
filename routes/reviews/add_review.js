//Добавляем плагин multer для работ с формами и файлами в node.js
const multer = require('multer')

//Настраиваем куда будем сохранять файл
const uplodeFormFrom = multer({ dest: '/uploads' })

//Устанавливаем название файла в форме
const fileFromForm = uplodeFormFrom.single('MYFILE')

const uuid = require('uuid')

const WorkerDataReviews = require('../../services/worker-tables/reviews.js')

module.exports = app => {

    /**
 * Маршрут для добавления отзыва:
 * Автор: Алексей Левада
 * Описание: Возвращает JSON с полями, которые описывают успешное добавление отзыва в БД 
 * Версия: v1
 * Метод: POST 
 */

    app.post('/reviews/add', fileFromForm, (req, res) => {

        data = {
            'ID': uuid.v4(),
            'USER': req.body.NAME,
            'GOOD_ID': req.body.GOOD_ID,
            'TEXT': req.body.TEXT,
        }

        new WorkerDataReviews(req, res).add(data)
    })

    /**
     * Вспомогательный маршрут для добавления отзыва в БД
     * Автор: Алексей Левада
     * Описание: Выводить форму для добавления отзыва
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/reviews/form_add_review
     */
    app.get('/reviews/form_add_review', (req, res) => {
        res.send(`
        <h1>
            Форма для добавления отзыва
        </h1>
        <form method='post' action='/reviews/add' enctype='multipart/form-data'>
        <input type='text' placeholder='Ваше имя' name='NAME'style='margin-bottom:15px'/><br>
        <textarea type='text' placeholder='Ваш отзыв о товаре' name='TEXT' cols=57 rows=10></textarea><br>
        <input type='submit' value='Отправить' style='margin-top:15px; padding:10px; font-size:14px; font-family: Trebuchet MS'/>
        </form>
        `)
    })
}