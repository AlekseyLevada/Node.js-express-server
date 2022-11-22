const WorkerDataBase = require('../worker-data-base/')

module.exports = class WorkerTableUsers extends WorkerDataBase {
    #name = 'users'
    constructor(req, res) {
        super()
        this.name_table = this.#name
        this.req = req
        this.res = res
    }
}