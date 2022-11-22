const WorkerDataBase = require('../worker-data-base/')

module.exports = class WorkerTableGoods extends WorkerDataBase {
    #name = 'goods'
    constructor(req, res) {
        super()
        this.name_table = this.#name
        this.req = req
        this.res = res
    }
}