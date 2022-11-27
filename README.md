# Node.js-express-server(Серверная часть для интернет магазина и административной панели)

## Файловая архитектура
-   node_modules (установленные модули)
    - "express": "^4.18.2", - модуль (FrameWork) для прописи маршрутов внутри приложения
    - "fs": "^0.0.1-security", - модуль для работы с файлами и файловой системы
    - "http": "^0.0.1-security", - модуль для работы с протоколом
    - "multer": "^1.4.5-lts.1", - модуль для работы с формами и файлами
    - "mysqli": "^3.1.4", - модуль для работы с Базой данных mySQL
    - "nodemailer": "^6.8.0", - модуль для работы с отправкой почтовых сообщений
    - "nodemon": "^2.0.20", - модуль для автообновления страницы
    - "uuid": "^9.0.0" - модуль для генерирования ID

### routes (Маршруты REST API)
    - files
        - add-file.js
        - del-file.js
    - mail
        - index.js
    - good
        - add_item.js
        - del_item.js
        - edit_item.js
        - get_all_goods.js
        - get_item.js
    - user
        - add_user.js
        - del_user.js
        - edit_user.js
        - get_all_users.js
        - get_user.js
    - reviews
        - add_review.js
        - del_review.js
        - edit_review.js
        - get_all_reviews.js
        - get_review.js

### -- services (Работа с таблицами mySQL с помощью ООП)
    - worker-data-base 
        - index.js (Абстрактный class с методами для маршрутов)
    - worker-files
        - index.js ()
    - worker-for-mail 
        - index.js (class для реализации отправки почтового сообщения администрации магазина)
    - worker-tables
        - goods.js (class реализации работы с mySQL таблицей товаров в магазине)
        - users.js (class реализации работы с mySQL таблицей пользователей в магазине)
        - reviews.js (class реализации работы с mySQL таблицей отзывово по товарам магазина)
    
### -- uploads (Папка для загрузки файлов, промежуточная папка для файловой системы)

### index.js - главная разводная страница REST API

### package.json - файл который содржит все зависимости приложения