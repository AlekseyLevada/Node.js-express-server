/**
 * Маршрут для удаления одного товара:
 * Автор: Алексей Левада
 * Описание: Возвращает JSON с успешным удалением из БД
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/del_item?id=1
 */
 module.exports = (app, connect) => app.get('/del_item', (req, res) => {
    
    const {id} = req.query

    //Сформировать запрос к БД на удаление
    const sql = `DELETE FROM goods WHERE ID='${id}'`
    connect.query(sql,(err, result) => {
        result.ourMessage = 'Объект успешно удален'
        err? res.send(err) : res.send(JSON.stringify(result)) 
    })
})