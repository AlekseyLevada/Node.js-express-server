//Добавляем плагин multer для работ с формами и файлами в node.js
const multer = require('multer')

//Настраиваем куда будем сохранять файл
const uplodeFormFrom = multer({ dest: '/uploads' })

//Устанавливаем название файла в форме
const fileFromForm = uplodeFormFrom.single('MYFILE')

/**
 * Маршрут для редактирования одного товара:
 * Автор: Алексей Левада
 * Описание: Возвращает JSON с полями, которые описывают успешное редактирования товара в БД 
 * Версия: v1
 * Метод: POST
 * Пример работы с запросом:
 * 
 */

const WorkerTableGoods = require ('../../services/worker-tables/goods.js')

module.exports = (app, connect) => {
    app.post('/goods/edit', fileFromForm, (req, res) => {

        const data = {
            'ID': req.body.ID,
            'TITLE': req.body.TITLE,
            'DISCR': req.body.DISCR,
            'PRICE': req.body.PRICE,
            'IMG': req.body.IMG,
            'COUNT': req.body.COUNT,
        }

        const workerTableGoods = new WorkerTableGoods(req, res)

        workerTableGoods.update(data)


        // const sql = "UPDATE goods SET `TITLE`='" + title + "',`DISCR`='" + discr + "',`PRICE`='" + price + "',`IMG`='" + img + "',`COUNT`='" + count + "' WHERE `ID`='" + id + "'"

        // //Стандартная конструкция для отправки запроса в базу
        // connect.query(sql, (err, result) => {
        //     err ? res.send(err) : res.send(JSON.stringify(result))
        // })
    })


    //
    /**
     * Вспомогательный маршрут для редактирования товара в БД
     * Автор: Алексей Левада
     * Описание: Выводить форму для редактирования товара
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/form_edit_item
     */

    app.get('/goods/form_edit_item', (req, res) => {
        res.send(
            `<h1>
            Форма для редактирования товара
        </h1>
            <form action='/goods/edit' method='post' enctype='multipart/form-data'>
                <input type='text' name='ID' placeholder ='ID'/>
                <input type='text' name='TITLE' placeholder ='TITLE'/>
                <input type='text' name='DISCR' placeholder ='DISCR'/>
                <input type='text' name='PRICE' placeholder ='PRICE'/>
                <input type='text' name='COUNT' placeholder ='COUNT'/>
                <input type='text' name='IMG' placeholder ='IMG'/>
                <input type='submit' value='Изменить'/>
            </form>
        `
        )
    })
}