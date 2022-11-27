//Документация NODE
//https://nodejs.org/dist/latest-v16.x/docs/api/synopsis.html#example

const WorkerFiles = require('./services/worker-files/index.js')

//Импортируем плагины
const express = require("express")
const mysql = require('mysql')

// Плагин для работы с файлами и папками
const fs = require('fs')

//Рабочий порт
const port = 3000

//Создадим подключение к баззе данных

//1. Создадим конфигурацию на подключение

// function config () {
//     return {
//       host: "94.228.126.172",
//       port: 3306,
//       user: "inordic_sch_usr",
//       password: "VANCfzNsov9GDt1M",
//       database: "inordic_school",
//       connectionLimit : 1000,
//       connectTimeout  : 60 * 60 * 1000,
//       acquireTimeout  : 60 * 60 * 1000,
//       timeout         : 60 * 60 * 1000
//     }
//   }


//2. Создадим подключение

//const connect = mysql.createPool(config())

//Инициализируем приложение express
const app = express();


/**
 * План для построения интернет магазина (что нужно добавить)
 * 
 * Базовые запросы для интерфейса магазина:
 * - Получение данных пользователя по его логину и паролю (использовать POST  запрос)
 * - Получение данных о всех товарах (использовать GET запрос)
 * - Получение данных об одном товаре (Использовать GET запрос)
 * Базовые запросы для интерфейса админки магазина:
 * - Удаление товара
 * - Добавление товара
 * - Редактирование товара
 * - Выводить список пользователей
 * - Удалять пользователя
 * - Редактировать пользователя
 * Дополнительно таблица истории купленных товаров
 * - Выводить историю
 * 
 * Сделать формы на базовом маршруте, для теста пост запросов
 * 
 * ДЗ 28 урок
 * Прописать все базовые (указанные выше) маршруты
 */


//Первый базовый маршрут приложения
app.get('/', (request, response) => {

        //Посылаем ответ от сервера
        ///console.log(request.query.test)

        //Декомпозиция объекта
        const {test, name} = request.query

        response.send(
            `
                <h1>
                    Разводная страница
                </h1>
                <ul style='line-height: 30px'>

                    <li>
                        <a href='/mail/form'> 1 - Отправить письмо</a>
                    </li>

                    <li>
                        <a href='/goods/get'> 2 - Получить все товары </a>
                    </li>

                    <li>
                        <a href='/goods/get/:id'> 3 - Получить один товар </a>
                    </li>

                    <li>
                        <a href='/goods/form_del_item'> 4 - Удалить товар </a>
                    </li>

                    <li>
                        <a href='/goods/form_add_good'> 5 - Добавить товар </a>
                    </li>

                    <li>
                        <a href='/goods/form_edit_item'> 6 - Редактировать товар </a>
                    </li>

                    <li>
                        <a href='/users/get'> 7 - Список всех пользователей</a>
                    </li>

                    <li>
                        <a href='/users/form_add_user'> 8 - Добавить пользователя </a>
                    </li>

                    <li>
                        <a href='/users/form_del_user'> 9 - Удалить пользователя </a>
                    </li>

                    <li>
                        <a href='/users/form_edit_user'> 10 - Редактировать пользователя</a>
                    </li>

                </ul>
                
            `
        )
    }
)

//Распределяем роутеры по файлам

const NAME_FOLDER_ROUTES = 'routes'

//Получаем массив с названиями папок внутри папки routes
const folderFromRoutes = fs.readdirSync(`./${NAME_FOLDER_ROUTES}`)

folderFromRoutes.map(folderName => {
    //получаем папки, внутри папок в папке routes

    const folderFromInRoutes = fs.readdirSync(`./${NAME_FOLDER_ROUTES}/${folderName}/`)

    folderFromInRoutes.map(fileName => {

        //console.log(fileName)

        require(`./${NAME_FOLDER_ROUTES}/${folderName}/${fileName}`)(app)
    })
})

// // Роуты для товаров
// require('./routes/good/get_all_goods.js')(app)
// require('./routes/good/get_item.js')(app)
// require('./routes/good/del_item.js')(app)
// require('./routes/good/add_item.js')(app)
// require('./routes/good/edit_item.js')(app)

// // Роуты для юзеров
// require('./routes/user/add_user.js')(app)
// require('./routes/user/del_user.js')(app)
// require('./routes/user/edit_user.js')(app)
// require('./routes/user/get_all_users.js')(app)
// require('./routes/user/get_user.js')(app)

// // Роуты для отзывов
// require('./routes/reviews/add_review.js')(app)
// require('./routes/reviews/get_all_reviews.js')(app)
// require('./routes/reviews/del_review.js')(app)
// require('./routes/reviews/edit_review.js')(app)

// //Роут для отправки писем
// require('./routes/mail/index.js')(app)

//Начинаем прослушивать порт который указали в настройках сервера (localhost:3000/)

app.listen(port, () => {
    console.log(`Сервер запущен на порту: ${port}`)
});
