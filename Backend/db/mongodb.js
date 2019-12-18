const consola = require('consola')
const CONFIG = require('../config')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

// remove DeprecationWarning
mongoose.set('useFindAndModify', false)

// mongoose Promise
mongoose.Promise = global.Promise

// mongoose
exports.mongoose = mongoose

// connect
exports.connect = () => {
    console.log(`CONFIG.database : ${CONFIG.database}`)

    // connect the database
    mongoose.connect(CONFIG.database, {
        useCreateIndex: true,
        useNewUrlParser: true,
        promiseLibrary: global.Promise
    })

    // connect error
    mongoose.connection.on('error', error => {
        consola.warn('Connect error!', error)
    })

    // connect succeed
    mongoose.connection.once('open', () => {
        consola.ready('Connect succeed!')
    })

    autoIncrement.initialize(mongoose.connection)

    // return mongoose instance
    return mongoose
}
