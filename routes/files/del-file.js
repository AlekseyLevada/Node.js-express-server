const multer = require('multer')
const fs = require('fs')


//Настраиваем куда будем сохранять файл
const uplodeFormFrom = multer({ dest: '/uploads' })

//Устанавливаем название файла в форме
const fileFromForm = uplodeFormFrom.single('MYFILE')

module.exports = (app) => {
    /**
     * Вспомогательный маршрут для удаления файла
     * Автор: Алексей Левада
     * Описание: Выводить форму для удаления файла
     * Версия: v1
     * Метод: POST
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/form_del_file
     */
    
    app.post('/file/del', fileFromForm, (req, res) => {
        //Получить название файла 
        const fileName = req.body.MYNAME

        const resFromAPI = {}

        fs.unlink(`./uploads/${fileName}`, (err)=> {
            if (err){
                resFromAPI.status = 500
                resFromAPI.message = 'Файл не удалось удалить'
                resFromAPI.err = err
                res.send(JSON.stringify(resFromAPI))
            }
            else {
                resFromAPI.status = 200
                resFromAPI.message = 'Файл успешно удален'
                resFromAPI.err = err
                res.send(JSON.stringify(resFromAPI))
            }
        })
    })
    /**
     * Вспомогательный маршрут дляудаления файла
     * Автор: Алексей Левада
     * Описание: Выводить форму для удаления файла
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/form_del_file
     */

     app.get('/form_del_file', (req, res) => {
        res.send(
            `<h1>
            Форма для удаления файла
        </h1>
            <form action='/file/del' method='post' enctype='multipart/form-data'>
                <input type='text' placeholder='Введите название файла' name='MYNAME'/><br>
                <input type='submit' value='Удалить' style='margin-top:15px'/>
            </form>
        `
        )
    })
}