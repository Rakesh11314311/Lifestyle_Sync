const { Schema, model } = require("mongoose");

const expenseSchema = new Schema({
    tag: { type: String, required: true },
    amount: { type: Number, required: true },
});

const finObjectSchema = new Schema({
    year: {
        type: Number, required: true, min: 1900, max: 2200
    },
    month: {
        type: Number, required: true, min: 1, max: 12
    },
    total: { type: Number, required: true },
    data: { type: [expenseSchema], required: true },
});

finObjectSchema.index({ year: -1, month: -1 });

module.exports = model("FinObject", finObjectSchema);