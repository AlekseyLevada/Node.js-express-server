const WorkerTableReviews = require('../../services/worker-tables/reviews.js')


module.exports = (app) => {
/**
 * Маршрут для получения всех отзывов:
 * Автор: Алексей Левада
 * Описание: Возвращает JSON со списком всех отзывов
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/reviews/get
 */
    app.get('/reviews/get', (req, res) => {
        new WorkerTableReviews(req, res).getAll()
    })
}