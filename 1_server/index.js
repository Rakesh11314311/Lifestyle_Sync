const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FinObject = require('./models/finance');
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

app.post('/finance/new', (req, res) => {
    if (FinObject.findOne({ year: req.body.year, month: req.body.month })) {
        res.json('Finance object already exists')
    } else {
        FinObject.create({
            year: req.body.year,
            month: req.body.month,
            total: req.body.total,
            data: req.body.data
        })
            .then(finObject => res.json(finObject))
            .catch(err => res.json(err))
    }
})

app.get('/finance/get', (req, res) => {
    const { year, month } = req.query
    FinObject.findOne({ year: year, month: month })
        .then(finObject => {
            if (finObject) {
                res.json(finObject)
            } else {
                res.status(404).json({ redirect: '/finance/add', message: 'No finance object found for this month' });
            }
        })
        .catch(err => res.json(err))
})

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})

