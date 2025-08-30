const { Schema, model } = require("mongoose");

const favMovieSchema = new Schema({
    movieId: { type: Number, required: true },
});

module.exports = model("FavMovie", favMovieSchema);