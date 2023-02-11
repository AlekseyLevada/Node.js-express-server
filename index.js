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

//Документация NODE
//https://nodejs.org/dist/latest-v16.x/docs/api/synopsis.html#example

const WorkerFiles = require('./services/worker-files/index.js')

//Импортируем плагины

const express = require("express")
const mysql = require('mysql')

// Плагин для работы с файлами и папками
const fs = require('fs')

//Рабочий порт
const port = 3001

//Создадим подключение к баззе данных

//1. Создадим конфигурацию на подключение

/**function config () {
    return {
      host: "94.228.126.172",
      port: 3306,
      user: "inordic_sch_usr",
      password: "VANCfzNsov9GDt1M",
      database: "inordic_school",
      connectionLimit : 1000,
      connectTimeout  : 60 * 60 * 1000,
      acquireTimeout  : 60 * 60 * 1000,
      timeout         : 60 * 60 * 1000
    }
  } */


//2. Создадим подключение

//const connect = mysql.createPool(config())

//Инициализируем приложение express

const app = express();

let corsOption = {
    origin: 'http://localhost:3000'
}

const cors = require('cors')
app.use(cors(corsOption))




//Первый базовый маршрут приложения
app.get('/', (request, response) => {

//Посылаем ответ от сервера
    //console.log(request.query.test)

    //Декомпозиция объекта
    const { test, name } = request.query

    response.send(
        `<body style='margin:0px; padding:0px'>
                <div class='wrapper' style='background:beige; height:100vh'>
                    <h1 style='text-align:center; font-family:Trebuchet MS'>
                        Разводная страница
                    </h1>
                    <div class='container' style='display:flex; justify-content:space-around; font-family:Trebuchet MS; font-size:16px'>
                        <div class='mail' style='outline:3px solid #000; padding:15px; width:15%'>
                            <h2 style='text-align:center'>
                                Почта
                            </h2>
                            <ul style='list-style:disc'>
                                <li>
                                    <a href='/mail/form' style='text-decoration:none'>Отправить письмо</a>
                                </li>
                            </ul>
                        </div>

                        <div class='goods' style='outline:3px solid #000; padding:15px; width:15%'>
                            <h2 style='text-align:center'>
                                Товары
                            </h2>
                                <ul style='line-height:30px; list-style:disc'>
                                    <li>
                                        <a href='/goods/get' style='text-decoration:none'>Получить товары </a>
                                    </li>
                                    <li>
                                        <a href='/goods/form_get_good' style='text-decoration:none'>Получить один товар</a>
                                    </li>
                                    <li>
                                        <a href='/goods/form_add_good' style='text-decoration:none'>Добавить товар</a>
                                    </li>
                                    <li>
                                        <a href='/goods/form_edit_good' style='text-decoration:none'>Редактировать товар</a>
                                    </li>
                                    <li>
                                        <a href='/goods/form_del_good' style='text-decoration:none'>Удалить товар</a>
                                    </li> 
                                </ul>
                        </div>

                        <div class='users' style='outline:3px solid #000; padding:15px; width:15%'>
                            <h2 style='text-align:center'>
                                Пользователи
                            </h2>
                                <ul style='line-height: 30px; list-style:disc'>
                                    <li>
                                        <a href='/users/get' style='text-decoration:none'>Список пользователей</a>
                                    </li>
                                    <li>
                                        <a href='/users/form_get_user' style='text-decoration:none'>Получить пользователя</a>
                                    </li>
                                    <li>
                                        <a href='/users/form_add_user' style='text-decoration:none'>Добавить пользователя</a>
                                    </li>
                                    <li>
                                        <a href='/users/form_edit_user' style='text-decoration:none'>Редактировать пользователя</a>
                                    </li>
                                    <li>
                                        <a href='/users/form_del_user' style='text-decoration:none'>Удалить пользователя</a>
                                    </li>
                                </ul>
                        </div>

                        <div class='reviews' style='outline:3px solid #000; padding:15px; width:15%'>
                            <h2 style='text-align:center'>
                                Отзывы
                            </h2>
                                <ul style='line-height:30px; list-style:disc'>
                                    <li>
                                        <a href='/reviews/get' style='text-decoration:none'>Список отзывов</a>
                                    </li>
                                    <li>
                                        <a href='/reviews/form_get_review' style='text-decoration:none'>Получить отзыв</a>
                                    </li>
                                    <li>
                                        <a href='/reviews/form_add_review' style='text-decoration:none'>Добавить отзыв</a>
                                    </li>
                                    <li>
                                        <a href='/reviews/form_del_review' style='text-decoration:none'>Удалить отзыв</a>
                                    </li>
                                    <li>
                                        <a href='/reviews/form_edit_review' style='text-decoration:none'>Редактировать отзыв</a>
                                    </li>
                                </ul>
                        </div>

                        <div class='files' style='outline:3px solid #000; padding:15px; width:15%'>
                            <h2 style='text-align:center'>
                                Работа с файлами
                            </h2>
                                <ul style='line-height:30px; list-style:disc'>
                                    <li>
                                        <a href='/files/form_add_file' style='text-decoration:none'>Добавить файл</a>
                                    </li>
                                    <li>
                                        <a href='/files/form_del_file' style='text-decoration:none'>Удалить файл</a>
                                    </li>
                                </ul>
                        </div>
                    </div>
                </div>
            </body>
        `)
})

//Распределяем роутеры по файлам

const firstLvlDir = 'routes'

//Получаем массив с названиями папок внутри папки routes

const folderFromFirstDir = fs.readdirSync(`./${firstLvlDir}`)

folderFromFirstDir.map(secondLvlDir => {

//Получаем папки, внутри папок в папке routes

    const fileInSecondDir = fs.readdirSync(`./${firstLvlDir}/${secondLvlDir}/`)

    fileInSecondDir.map(fileName => {

        //console.log(fileName)

        require(`./${firstLvlDir}/${secondLvlDir}/${fileName}`)(app)
    })
})

/**
Роуты для товаров
require('./routes/good/get_all_goods.js')(app)
require('./routes/good/get_item.js')(app)
require('./routes/good/del_item.js')(app)
require('./routes/good/add_item.js')(app)
require('./routes/good/edit_item.js')(app)

Роуты для юзеров
require('./routes/user/add_user.js')(app)
require('./routes/user/del_user.js')(app)
require('./routes/user/edit_user.js')(app)
require('./routes/user/get_all_users.js')(app)
require('./routes/user/get_user.js')(app)

Роуты для отзывов
require('./routes/reviews/add_review.js')(app)
require('./routes/reviews/get_all_reviews.js')(app)
require('./routes/reviews/del_review.js')(app)
require('./routes/reviews/edit_review.js')(app)

//Роут для отправки писем
require('./routes/mail/index.js')(app)
 */

//Начинаем прослушивать порт который указали в настройках сервера (localhost:3000/)

app.listen(port, () => {
    console.log(`Сервер запущен на порту: ${port}`)
});
