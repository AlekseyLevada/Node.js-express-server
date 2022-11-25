//Добавляем плагин multer для работ с формами и файлами в node.js
const multer = require('multer')

//Настраиваем куда будем сохранять файл
const uplodeFormFrom = multer({ dest: '/uploads' })

//Устанавливаем название файла в форме
const fileFromForm = uplodeFormFrom.single('MYFILE')

const WorkerDataReviews = require('../../services/worker-tables/reviews.js')

module.exports = (app) => {
    
    /**
 * Маршрут для удаления отзыва:
 * Автор: Алексей Левада
 * Описание: Возвращает JSON с полями, которые описывают успешное удаление отзыва в БД 
 * Версия: v1
 * Метод: POST 
 */

app.post('/reviews/del', fileFromForm, (req,res) => {
    const ID = req.body.ID
    new WorkerDataReviews(req, res).delete(ID)
})

    /**
     * Вспомогательный маршрут для удаления отзыва из БД
     * Автор: Алексей Левада
     * Описание: Выводить форму для удаления отзыва
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/reviews/form_del_review
     */
    app.get('/reviews/form_del_review', (req, res) => {
        res.send(`
            <h1>
                Введите ID отзыва для его удаления
            </h1>
            <form method='post' action='/reviews/del' enctype='multipart/form-data'>
                <input type='text' placeholder='ID отзыва' name='ID'/>
                <input type='submit' value='Удалить'>
            </form>
        `)
    })
}