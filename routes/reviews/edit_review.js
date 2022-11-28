//Добавляем плагин multer для работ с формами и файлами в node.js
const multer = require('multer')

//Настраиваем куда будем сохранять файл
const uplodeFormFrom = multer({ dest: '/uploads' })

//Устанавливаем название файла в форме
const fileFromForm = uplodeFormFrom.single('MYFILE')

const WorkerTablesReviews = require('../../services/worker-tables/reviews.js')

module.exports = (app) => {

    /**
     * Маршрут для редактирования отзыва:
     * Автор: Алексей Левада
     * Описание: Возвращает JSON с полями, которые описывают успешное редактирования отзыва в БД 
     * Версия: v1
     * Метод: POST 
     */

    app.post('/reviews/edit', fileFromForm, (req, res) => {

        data = {
            'ID': req.body.ID,
            'TEXT': req.body.TEXT,
            'USER':req.body.USER,
            'GOOD_ID': req.body.GOOD_ID,
        }

        //console.log(req.body.ID)
        
        new WorkerTablesReviews(req, res).update(data)
    })

    /**
     * Вспомогательный маршрут для редактирования отзыва в БД
     * Автор: Алексей Левада
     * Описание: Выводить форму для редактирования отзыва
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/reviews/form_edit_review
     */

    app.get('/reviews/form_edit_review', (req, res) => {
        res.send(`
            <h1>
                Форма для редактирования отзыва
            </h1>
            <form method='post' action='/reviews/edit' enctype='multipart/form-data'>
                <input type='text' name='ID' placeholder='ID отзыва' style='margin-bottom:15px'><br>
                <input type='text' name='USER' placeholder='Имя пользователя' style='margin-bottom:15px'><br>
                <input type='text' name='GOOD_ID' placeholder='ID товара' style='margin-bottom:15px'><br>
                <textarea type='text' placeholder='Новый текст' name='TEXT' cols=67 rows=15 style='margin-bottom:15px'></textarea><br>
                <input type='submit' value='Изменить' style='margin-top:15px; padding:10px; font-size:14px; font-family: Trebuchet MS'>
            </form>
        `)
    })
}