const multer = require('multer')

//Настраиваем куда будем сохранять файл
const uplodeFormFrom = multer({ dest: 'uploads/' })

//Устанавливаем название файла в форме
const fileFromForm = uplodeFormFrom.single('MYFILE')

const fs = require('fs')

module.exports = (app) => {

    /**
     * Маршрут для добавления файла в БД
     * Автор: Алексей Левада
     * Описание: Добавляет файл на сервер
     * Версия: v1
     * Метод: POST
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/file/add
     */

    app.post('/files/file/add', fileFromForm, (req, res) => {
        // Вывод в консоль файла

        // console.log(req.file) - возвращает объект в котором описаны все свойства загружаемого файла
        // console.log(req.body) - Возвращает объект в котором присутствуют все поля из формы которые имеют атрибут name

        // const fileFromForm = req.file

        // // Откуда приходит файл
        // const pathToFile = fileFromForm.path

        // //Место охранения файла
        // const pathToSaveFile = 'uploads/' + fileFromForm.originalname
        
        const src = fs.createReadStream(req.file.path)
        const dest = fs.createWriteStream('uploads/' + req.file.originalname)
       
        // Запуск процесса записи файлов
        src.pipe(dest)

        const resFromAPI = {}

        src.on('end', () => {
            resFromAPI.status = 200
            resFromAPI.message = 'Файл успешно загрузился'
            res.send(JSON.stringify(resFromAPI))
        })

        src.on('error', () => {
            resFromAPI.status = 500
            resFromAPI.message = 'Ошибка загрузки'
            res.send(JSON.stringify(resFromAPI))
        })
    })

    /**
     * Вспомогательный маршрут для добавления файла в БД
     * Автор: Алексей Левада
     * Описание: Выводить форму для добавления файла
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/files/form_add_file
     */

     app.get('/files/form_add_file', (req, res) => {
        res.send(
            `<h1>
            Форма для добавления файла
        </h1>
            <form action='/files/file/add' method='post' enctype='multipart/form-data'>
                <input type='file' name='MYFILE'/><br>
                <input type='submit' value='Сохранить' style='margin-top:15px'/>
            </form>
        `
        )
    })
}