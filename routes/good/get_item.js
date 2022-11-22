/**
 * Маршрут для получения одного товара:
 * Автор: Алексей Левада
 * Описание: Возвращает JSON со одним товаром
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/get_item?id=1
 */
const WorkerTabelUser = require('../../services/worker-tables/users.js')

 module.exports = (app, connect) => 
    app.get('/goods/get/:id',(req, res) => {
    
    const {id} = req.params

    //const {id} = req.query

    const workerTableGoods = new WorkerTabelUser(req, res)

    workerTableGoods.get(id)

    //console.log(id)

    // //Формируем новый запрос
    // const sql = `SELECT * FROM goods WHERE ID=${id}`
    
    // // Отправляем стандартный запрос на сервер
    //     connect.query(sql, (err, result) => {
    //         err? res.send(err) : res.send(JSON.stringify(result)) 
    //     })
    })