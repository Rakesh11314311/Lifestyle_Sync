const mongoose = require('mongoose');
const Expense = require('./models/finance/finance');

mongoose.connect('mongodb://localhost:27017/Lifestyle', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const demoFinList = [
    {
        year: 2025,
        month: 12,
        total: 50000,
        data: [
            { tag: "Housing", amount: 18000 },
            { tag: "Food", amount: 6000 },
            { tag: "Transportation", amount: 4000 },
            { tag: "Savings", amount: 20000 },
            { tag: "Entertainment", amount: 2000 }
        ]
    },
    {
        year: 2025,
        month: 1,
        total: 45000,
        data: [
            { tag: "Housing", amount: 15000 },
            { tag: "Food", amount: 5000 },
            { tag: "Transportation", amount: 3000 },
            { tag: "Savings", amount: 2000 },
            { tag: "Healthcare", amount: 4000 },
            { tag: "Miscellaneous", amount: 1000 }
        ]
    },
    {
        year: 2025,
        month: 2,
        total: 60000,
        data: [
            { tag: "Housing", amount: 20000 },
            { tag: "Food", amount: 8000 },
            { tag: "Transportation", amount: 5000 },
            { tag: "Savings", amount: 25000 },
            { tag: "Clothing", amount: 2000 }
        ]
    },
    {
        year: 2025,
        month: 3,
        total: 35000,
        data: [
            { tag: "Housing", amount: 12000 },
            { tag: "Food", amount: 4000 },
            { tag: "Debt", amount: 3000 },
            { tag: "Entertainment", amount: 3000 },
            { tag: "Savings", amount: 10000 },
            { tag: "Education", amount: 3000 }
        ]
    },
    {
        year: 2025,
        month: 4,
        total: 40000,
        data: [
            { tag: "Housing", amount: 16000 },
            { tag: "Food", amount: 6000 },
            { tag: "Transportation", amount: 4000 },
            { tag: "Savings", amount: 15000 },
            { tag: "Entertainment", amount: 2000 }
        ]
    },
    {
        year: 2025,
        month: 5,
        total: 55000,
        data: [
            { tag: "Housing", amount: 19000 },
            { tag: "Food", amount: 7000 },
            { tag: "Transportation", amount: 5000 },
            { tag: "Savings", amount: 25000 },
            { tag: "Entertainment", amount: 2000 }
        ]
    }
];

Expense.insertMany(demoFinList)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })