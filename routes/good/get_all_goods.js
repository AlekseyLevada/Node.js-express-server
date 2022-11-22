/**
 * Маршрут для получения всех товаров:
 * Автор: Алексей Левада
 * Описание: Возвращает JSON со списком всех товаров
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/goods/get
 */

const WorkerTableGoods = require('../../services/worker-tables/goods.js')

module.exports = (app, connect) =>
    app.get('/goods/get', (req, res) => {

    const workerTableGoods = new WorkerTableGoods(req, res)

    workerTableGoods.getAll()
})