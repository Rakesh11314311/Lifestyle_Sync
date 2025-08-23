const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FinObject = require('./models/finance/finance');
const FavMovie = require('./models/entertainment/fav-movies');
const FoodIntake = require('./models/health/food-intake');
const NutritionData = require('./models/health/nutrition-data');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/Lifestyle', {})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.get('/finance/latest', (req, res) => {
    FinObject.findOne().sort({ year: -1, month: -1 })
        .then(finObject => {
            if (finObject) {
                res.json(finObject);
            } else {
                res.status(404).json({
                    redirect: '/finance/add',
                    message: 'Make your first finance object to get started'
                });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/finance/new', async (req, res) => {
    try {
        const existing = await FinObject.findOne({ year: req.body.year, month: req.body.month });
        if (existing) {
            return res.json('Finance object already exists');
        }

        const finObject = await FinObject.create({
            year: req.body.year,
            month: req.body.month,
            total: req.body.total,
            data: req.body.data
        });

        res.json(finObject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/finance/get', (req, res) => {
    const { year, month } = req.query
    FinObject.findOne({ year: Number(year), month: Number(month) })
        .then(finObject => {
            if (finObject) {
                res.json(finObject)
            } else {
                res.status(404).json({ redirect: '/finance/add', message: 'No finance object found for this month' });
            }
        })
        .catch(err => res.json(err))
})

app.post('/fav-movies/new', async (req, res) => {
    try {
        const existing = await FavMovie.findOne({ movieId: req.body.movieId });
        if (existing) {
            return res.json('Movie already in favourites');
        }

        const favMovie = await FavMovie.create({
            movieId: req.body.movieId
        });

        res.json(favMovie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/fav-movies/remove', async (req, res) => {
    try {
        if (!req.body.movieId) {
            return res.status(400).json({ error: 'movieId is required' });
        }

        await FavMovie.deleteMany({ movieId: req.body.movieId });
        res.json('Movie removed');
    }
    catch (err) {
        console.error('Error removing movie:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/fav-movies/isfav', async (req, res) => {
    try {
        if (!req.body.movieId) {
            return res.status(400).json({ error: 'movieId is required' });
        }

        const existingFav = await FavMovie.findOne({ movieId: req.body.movieId });
        if (existingFav) {
            console.log("Movie is in favourites");
            return res.json(true);
        }
        else {
            console.log("Movie is not in favourites");
            return res.json(false);
        }
    }
    catch (err) {
        console.error('Error checking favorite status:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/food-data/latest', (req, res) => {
    FoodIntake.findOne().sort({ year: -1, month: -1 })
        .then(foodData => {
            if (foodData) {
                res.json(foodData);
            } else {
                res.status(404).json({
                    message: 'Make your first food data object to get started'
                });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/food-data/new', async (req, res) => {
    const existingData = await FoodIntake.findOne({ year: req.body.year, month: req.body.month, day: req.body.day });
    if (existingData) {
        return res.json('Food data already exists');
    }

    const foodData = await FoodIntake.create({
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        items: req.body.items
    });

    res.json(foodData);
});

app.get('/food-data/get', async (req, res) => {
    const foodData = await FoodIntake.find({ year: req.query.year, month: req.query.month, day: req.query.day });

    if (!foodData.length) {
        return res.status(404).json({ error: 'No food data found for this day' });
    }

    return res.json(foodData);
});

app.post('/nutrition-data/new', async (req, res) => {
    const existingData = await NutritionData.findOne({ year: req.body.year, month: req.body.month, day: req.body.day });
    if (existingData) {
        return res.json('Nutrition data already exists');
    }

    const nutritionData = await NutritionData.create({
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        items: req.body.items
    });

    res.json(nutritionData);
});

app.get('/nutrition-data/get', async (req, res) => {
    const nutritionData = await NutritionData.find({ year: req.query.year, month: req.query.month, day: req.query.day });

    if (!nutritionData.length) {
        return res.status(404).json({ error: 'No nutrition data found for this day' });
    }

    return res.json(nutritionData);
});

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})

