//Добавляем плагин multer для работ с формами и файлами в node.js
const multer = require('multer')

//Настраиваем куда будем сохранять файл
const uplodeFormFrom = multer({ dest: '/uploads' })

//Устанавливаем название файла в форме
const fileFromForm = uplodeFormFrom.single('MYFILE')

const WorkerTableGoods = require('../../services/worker-tables/goods.js')

/**
 * Маршрут для удаления одного товара:
 * Автор: Алексей Левада
 * Описание: Возвращает сообщение с успешным удалением товара из БД
 * Версия: v1
 * Метод: POST
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/goods/del
 */

module.exports = (app) => {
    app.post('/goods/del', fileFromForm, (req, res) => {
        const id = req.body.ID
        const workerTableGoods = new WorkerTableGoods(req, res)
        workerTableGoods.delete(id)
    })

    /**
     * Вспомогательный маршрут для удаления одного товара:
     * Автор: Алексей Левада
     * Описание: Возвращает форму для удаления товара из БД
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/goods/form_del_item
     */

    app.get('/goods/form_del_item', (req, res) => {
        res.send(`
        <form method='post' action='/goods/del/' enctype='multipart/form-data'>
            <h1>
                Введите ID товара для удаления
            </h1>

            <input type='text' placeholder='Введите id товара' name='ID' style='width:250px'/>
            <input type='submit' value='Удалить'/>
        </form>
        `)
    })
}
    
    
    
    
    
    