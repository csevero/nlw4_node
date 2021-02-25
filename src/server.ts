import 'reflect-metadata';
import './database';
import express from 'express';

const server = express();

server.get('/', (req,res) => {
   return res.send('hello');
})

server.listen(3333, () => {
   console.log('rodando na porta 3333')
})