const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true },
    description: {type: String, default: ''},
    completed: {type: Boolean, default: false}
}, { versionKey: false });

module.exports = model('Todo', schema)
