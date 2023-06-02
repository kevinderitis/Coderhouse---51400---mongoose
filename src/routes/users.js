import { Router } from 'express';
import { userModel } from '../db/model/user.model.js';
const userRouter = Router();

userRouter.get('/', async (req, res) => {
    let usuarios;
    try {
      usuarios = await userModel.find()
    } catch (error) {
        console.log(error)
    }
    
    res.send({ status: "success", payload: usuarios})
})

userRouter.get('/:id', async (req, res) => {
    let id = req.params.id;
    let usuario;
    try {
      usuario = await userModel.find({ _id: id})
    } catch (error) {
        console.log(error)
    }
    
    res.send({ status: "success", payload: usuario})
})

userRouter.post('/', async (req, res) => {
    let { first_name, last_name, email } = req.body;
    if(!first_name || !last_name || !email) return res.send({ status: "error", error: "Incomplete values"})
    let usuario;
    try {
        usuario = await userModel.create({
            first_name,
            last_name,
            email
        });
    } catch (error) {
        console.log(error);
    }


    res.send({ status: "success", payload: usuario})
})

userRouter.put('/:uid', async (req, res) => {
    let uid = req.params.uid;
    let { first_name, last_name, email } = req.body;
    if(!first_name || !last_name || !email) return res.send({ status: "error", error: "Incomplete values"})
    let usuario;
    try {
        usuario = await userModel.updateOne({ _id: uid }, { first_name, last_name, email });
    } catch (error) {
        console.log(error);
    }


    res.send({ status: "success", payload: usuario})
})

userRouter.delete('/:uid', async (req, res) => {
    let uid = req.params.uid;
    let usuario;
    try {
        usuario = await userModel.deleteOne({ _id: uid });
    } catch (error) {
        console.log(error);
    }


    res.send({ status: "success", payload: usuario})
})

userRouter.post('/migrateUsers', async (req, res) => {
    const usuarios = [
    { first_name: 'Pedro', last_name: 'Mei', edad: 21, email: 'example1@mail.com', curso: '1A', nota: 7 },
    { first_name: 'Ana', last_name: 'Gonzalez', edad: 32, email: 'example2@mail.com', curso: '1A', nota: 8 },
    { first_name: 'José', last_name: 'Picos', edad: 29, email: 'example3@mail.com', curso: '2A', nota: 6 },
    { first_name: 'Lucas', last_name: 'Blanco', edad: 22, email: 'example4@mail.com', curso: '3A', nota: 10 },
    { first_name: 'María', last_name: 'García', edad: 36, email: 'example5@mail.com', curso: '1A', nota: 9 },
    { first_name: 'Federico', last_name: 'Perez', edad: 41, email: 'example6@mail.com', curso: '2A', nota: 5 },
    { first_name: 'Tomas', last_name: 'Sierra', edad: 19, email: 'example7@mail.com', curso: '2B', nota: 4 },
    { first_name: 'Carlos', last_name: 'Fernández', edad: 33, email: 'example8@mail.com', curso: '3B', nota: 2 },
    { first_name: 'Fabio', last_name: 'Pieres', edad: 39, email: 'example9@mail.com', curso: '1B', nota: 9 },
    { first_name: 'Daniel', last_name: 'Gallo', edad: 25, email: 'example10@mail.com', curso: '3B', nota: 2 }
]
let result
try {
    result = await userModel.insertMany(usuarios)
} catch (error) {
    console.log(error)
}
    res.send(result)
})


export default userRouter;