import request from "supertest";
import { getConnection, getCustomRepository } from "typeorm";
import { server } from "../app";
import createConnection from "../database";
import { SurveyRepository } from "../repositories/SurveyRepository";

describe("Surveys Tests", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();

    const surveysRepository = getCustomRepository(SurveyRepository);
    surveysRepository.delete({});
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new Survey", async () => {
    const response = await request(server).post("/surveys").send({
      title: "Teste de criação de pesquisa",
      description: "testinho ok",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should be able to show all suverys", async () => {
    const response = await request(server).get("/surveys");

    expect(response.status).toBe(200);
  });
});
