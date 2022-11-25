const WorkerDataBase  = require('../worker-data-base/index.js')

module.exports = class WorkerDataReviews extends WorkerDataBase {
    #name = 'reviews'
    constructor(req, res) {
        super()
        this.name_table = this.#name
        this.req = req
        this.res = res
    }
}