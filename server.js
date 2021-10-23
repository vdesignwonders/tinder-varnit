import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Cards from './dbCards.js';

//app config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://admin:rNUyO5IVQR48Ar8Z@cluster0.h84bd.mongodb.net/tinderdb?retryWrites=true&w=majority';

//middlewares
app.use(express.json());
app.use(Cors());

//dbconfig
mongoose.connect(connection_url, {
    useUnifiedTopology: true
});
//api endpoints 
app.get("/", (req,res) => res.status(200).send("Hello Programmers"));

app.post("/tinder/cards", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if(err){
            res.status(500).send(err);

        }else{
            res.status(201).send(data);
        }

    });
});

app.get("/tinder/cards", (req, res) => {

    Cards.find((err, data) => {
        if(err){
            res.status(500).send(err);

        }else{
            res.status(200).send(data);
        }

    });
});

//listener
app.listen(port, () => console.log(`listen on local: ${port}`));
