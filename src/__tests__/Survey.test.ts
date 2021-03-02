import request from "supertest";
import { server } from "../app";
import beforeAllAndAfterAll from "./utils";

describe("Surveys Tests", () => {
  beforeAllAndAfterAll();

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
