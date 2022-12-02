//Добавляем плагин multer для работ с формами и файлами в node.js
const multer = require('multer')

//Настраиваем куда будем сохранять файл
const uplodeFormFrom = multer({ dest: '/uploads' })

//Устанавливаем название файла в форме
const fileFromForm = uplodeFormFrom.single('MYFILE')

// Установка плагина который генерирует случайные ID
const uuid = require('uuid')

const WorkerTableGoods = require('../../services/worker-tables/goods.js')

module.exports = (app) => {
    /**
     * Маршрут для добавления одного товара:
     * Автор: Алексей Левада
     * Описание: Возвращает JSON с полями, которые описывают успешное добавление товара в БД 
     * Версия: v1
     * Метод: POST
 */
    app.post('/goods/add', fileFromForm, (req, res) => {

        //console.log(req.body.TITLE)

        const data = {
            "ID": uuid.v4(),
            'TITLE': req.body.TITLE,
            'DISCR': req.body.DISCR,
            'PRICE': req.body.PRICE,
            'IMG': req.body.IMG,
            'COUNT': req.body.COUNT,
        }

        const workerTableGoods = new WorkerTableGoods(req, res)

        workerTableGoods.add(data)

        /**
        *   //Сгенерировать запрос на добавление товаров в БД
        *   const sql = 'INSERT INTO `goods` (`ID`,`TITLE`,`DISCR`,`PRICE`,`IMG`,`COUNT`) VALUES ("' + id + '","' + title + '","' + discr + '","' + price + '","' + img + '","' + count + '")'
        *   //Стандартная конструкция для отправки запроса в базу
        *   connect.query(sql, (err, result) => {
        *   err ? res.send(err)
        *   :
        *   res.send(JSON.stringify(result))
         })
        */
    })

    /**
     * Вспомогательный маршрут для добавления товара в БД
     * Автор: Алексей Левада
     * Описание: Выводить форму для добавления товара
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/goods/form_add_good
     */

    app.get('/goods/form_add_good', (req, res) => {
        res.send(
            `<h1>
            Форма для добавления товара
        </h1>
            <form action='/goods/add' method='post' enctype='multipart/form-data'>
                <input type='text' name='TITLE' placeholder ='TITLE' style='margin-bottom:15px; height:25px'/><br>
                <textarea type='text' name='DISCR' placeholder ='DISCR' style='margin-bottom:15px' cols='58' rows='15'></textarea><br>
                <input type='text' name='PRICE' placeholder ='PRICE' style='margin-bottom:15px; height:25px'/><br>
                <input type='text' name='COUNT' placeholder ='COUNT' style='margin-bottom:15px; height:25px'/><br>
                <input type='file' name='IMG' placeholder ='IMG' style='margin-bottom:15px'/><br>
                <input type='submit' value='Добавить'/>
            </form>
        `
        )
    })
}