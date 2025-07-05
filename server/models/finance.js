const mongoose = require('mongoose')

const FinanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    income: {
        type: Number,
        required: true,
        default: 0
    },
    expenses: {
        type: Number,
        required: true,
        default: 0
    },
    savings: {
        type: Number,
        required: true,
        default: 0
    }

})

const FinanceModel = mongoose.model('Finance', FinanceSchema)

module.exports = FinanceModel
