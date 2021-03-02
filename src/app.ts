import "reflect-metadata";
import createConnection from "./database";
import express, { NextFunction, Request, Response } from "express";

//usado para conseguir retornar promises de error, sem essa lib a função do middleware não funciona
import "express-async-errors";
import { router } from "./routes";
import { AppError } from "./errors/AppError";

createConnection();
const server = express();

server.use(express.json());
server.use(router);

/* a função abaixo é basicamente um middleware para verificarmos qual é o tipo do erro se for um erro do tipo AppError que foi nossa classe personalizada de erro criada, ele irá retornar o status e a mensagem do erro, se não for ele retorna um status 500 com internal server error */
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    status: "Error",
    message: `Internal server error ${err.message}`,
  });
});

export { server };
