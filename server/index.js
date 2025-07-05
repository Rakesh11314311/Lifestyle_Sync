const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const UserModel = require('./models/user')


const app = express()
app.use(cors())
app.use(express.json())

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/lifestylesync', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log(err)
    }
}

connectDB()

// Signup
app.post('/signup', async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const user = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        })
        res.json(user)
    } catch (err) {
        res.json(err)
    }
})

// Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email: email })

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (isPasswordValid) {
                res.json('Success')
            } else {
                res.json('The email or password is incorrect')
            }
        } else {
            res.json('The email or password is incorrect')
        }
    } catch (err) {
        res.json(err)
    }
})

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})
