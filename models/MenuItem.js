const mongoose = require('mongoose')

const MenuSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String
})

module.exports = mongoose.model('MenuItem', MenuSchema)
