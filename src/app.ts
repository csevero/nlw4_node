import "reflect-metadata";
import createConnection from "./database";
import express from "express";
import { router } from "./routes";

createConnection();
const server = express();

server.use(express.json());
server.use(router);

export { server };
