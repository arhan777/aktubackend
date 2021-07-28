const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {userModel} = require('./Model');

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello');
})

app.post('/login',async (req, res) => {
    const { userName, password } = req.body;
    const newUser = await new userModel({
        userName,
        password
    })
    newUser.save((err, result) => {
        if(err){
            res.send({status: 400})
        }
        res.send({status: 200})
    });
})

app.get('/api/:id', (req, res) => {
    console.log(req.params.id);
    res.send(req.params)
})

app.get('/apistr/:id', (req, res) => {
    console.log(req.params.id);
    res.send(req.params.id)
})

const url = `mongodb+srv://aktudata:WPmVjkbDwzChstXN@cluster0.alow0.mongodb.net/aktudatabase?retryWrites=true&w=majority`
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected…"))
    .catch(err => console.log("error ", err))

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`connected to port ${port}`);
})
