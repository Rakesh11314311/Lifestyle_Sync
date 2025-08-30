const { Schema, model } = require("mongoose");

const dataPairSchema = new Schema({
    nutrient: { type: String, required: true },
    amount: { type: Number, required: true },
});

const nutritionDataSchema = new Schema({
    year: {
        type: Number, required: true, min: 1900, max: 2200
    },
    month: {
        type: Number, required: true, min: 1, max: 12
    },
    day: {
        type: Number, required: true, min: 1, max: 31
    },
    items: { type: [dataPairSchema], required: true },
});

nutritionDataSchema.index({ year: -1, month: -1, day: -1 });

module.exports = model("NutritionData", nutritionDataSchema);