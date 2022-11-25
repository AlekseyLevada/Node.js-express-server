//Подключим модуль для работы с базой данных mySQL

const mysql = require('mysql')


// Абстрактный класс для работы с таблицами в БД

module.exports = class WorkerDataBase {
    req = ''
    res = ''
    name_table = ''
    #config = {
        host: "94.228.126.172",
        port: 3306,
        user: "inordic_sch_usr",
        password: "VANCfzNsov9GDt1M",
        database: "inordic_school",
        connectionLimit: 1000,
        connectTimeout: 60 * 60 * 1000,
        acquireTimeout: 60 * 60 * 1000,
        timeout: 60 * 60 * 1000
    }

    // Устанавливаем соединение с БД и обязательно возвращаем его

    getConnect() {
        return mysql.createPool(this.#config)
    }

    query(sql) {
        this.getConnect().query(sql, (err, result) => {
            err ?
                this.res.send(err)
                :
                this.res.send(JSON.stringify(result))
        })
    }

    // Абстрактный (общий, универсальный) метод который позволяет делать запросы к базе данных

    getAll() {
        const sql = `SELECT * FROM ${this.name_table}`
        this.query(sql)
    }

    get(id) {
        // Абстрактный запрос к БД
        const sql = `SELECT * FROM ${this.name_table} WHERE ID='${id}'`
        this.query(sql)
    }

    //Сгнерировать запрос на добавление пользователя в БД

    // const sql = 'INSERT INTO `users` (`ID`,`NAME`,`SURNAME`,`EMAIL`,`IMG`,`PHONE`,`LOGIN`,`PASSWORD`,`ROLE`) VALUES ("' + id + '","' + name + '","' + surname + '","' + email + '","' + img + '","' + phone + '","' + login + '","' + password + '","' + role + '")'

    add(data) {
        let sql = `INSERT INTO ${this.name_table}`
        let partField = '('
        let partValue = '('
        const length = Object.keys(data).length

        // С помощью конкатенации склеить две части запроса
        let count = 0

        for (let field in data) {
            partField += '`' + field + '`'
            partValue += "'" + data[field] + "'"
            if (length - 1 !== count) {
                partField += `, `
                partValue += `, `
            }
            count++
        }
        partField += ')'
        partValue += ')'

        sql += partField + ' ' + 'VALUES' + ' ' + partValue

        this.query(sql)
    }

    update(data) {
        let sql = `UPDATE ${this.name_table} SET `
        let entries = Object.entries(data)
        let length = entries.length
        let count = 0
        let comma = ', '
        for (let element of entries) {
            if (element[0] != 'ID') {
                sql += '`' + element[0] + '`' + "=" + '"' + element[1] + '"'
                if (length - 1 !== count) {
                    sql += comma
                }
            }
            count++
        }
        sql += ` WHERE ID='${data.ID}'`
        this.query(sql)
    }

    delete(id) {
        let sql = `DELETE FROM ${this.name_table} WHERE ID ='${id}'`
        this.query(sql)
    }
}