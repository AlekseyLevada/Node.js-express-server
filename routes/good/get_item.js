/**
 * Маршрут для получения одного товара:
 * Автор: Алексей Левада
 * Описание: Возвращает JSON со одним товаром
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/goods/get_item/
 */
const WorkerTabelGoods = require('../../services/worker-tables/goods.js')

module.exports = (app) =>
   app.get('/goods/get/:id', (req, res) => {

      const { id } = req.params
      //console.log(req.params)

      //const {id} = req.query

      const workerTableGoods = new WorkerTabelGoods(req, res)

      workerTableGoods.get(id)
   })