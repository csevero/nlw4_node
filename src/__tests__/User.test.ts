import request from "supertest";
import { getConnection, getCustomRepository } from "typeorm";
import { server } from "../app";

import createConnection from "../database";
import { UserRepository } from "../repositories/UserRepository";

describe("Users Tests", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();

    const usersRepository = getCustomRepository(UserRepository);
    await usersRepository.delete({});
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new user", async () => {
    const response = await request(server).post("/users").send({
      name: "John",
      email: "john@mail.com",
    });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a user with exists email", async () => {
    const response = await request(server).post("/users").send({
      name: "John",
      email: "john@mail.com",
    });

    expect(response.status).toBe(400);
  });
});
