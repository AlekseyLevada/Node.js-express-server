//Добавляем плагин multer для работ с формами и файлами в node.js
const multer = require('multer')

//Настраиваем куда будем сохранять файл
const uplodeFormFrom = multer({ dest: '/uploads' })

//Устанавливаем название файла в форме
const fileFromForm = uplodeFormFrom.single('MYFILE')

const WorkerTableReviews = require('../../services/worker-tables/reviews.js')

module.exports = (app) => {
    
/**
 * Маршрут для получения одного отзыва:
 * Автор: Алексей Левада
 * Описание: Возвращает JSON со одним отзывом
 * Версия: v1
 * Метод: POST
 */

    app.post('/reviews/get/:id', fileFromForm, (req, res) => {
        const ID = req.body.ID
        new WorkerTableReviews(req, res).get(ID)
    })

    /**
     * Вспомогательный маршрут для получения одного отзыва из БД
     * Автор: Алексей Левада
     * Описание: Выводит форму для поиска отзыва в БД
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/reviews/form_get_review
     */

    app.get('/reviews/form_get_review', (req, res) => {
        res.send(`
            <form enctype='multipart/form-data' method='post' action='/reviews/get/:id'>
                <h1>
                    Введите ID отзыва для поиска
                </h1>
                <input type='text' placeolder='введите ID' name='ID'><br>
                <input type='submit' value='Поиск' style='margin-top:15px'/>
            <form/>
        `)
    })
}