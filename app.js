import express from 'express';
import mongoose from 'mongoose';
import userRouter from './src/routes/users.js';
const app = express();


mongoose.connect('mongodb+srv://coderhouse:coder123456@coderhouse.z88zdi9.mongodb.net/coder?retryWrites=true&w=majority')
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err))


app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/user', userRouter)


const server = app.listen(8080, () =>  console.log(`Server running on port: ${server.address().port}`));
server.on('error', error => console.log(error));