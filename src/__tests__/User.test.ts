import request from "supertest";
import { server } from "../app";
import beforeAllAndAfterAll from "./utils";

describe("Users Tests", () => {
  beforeAllAndAfterAll();

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

  it("should not be able to create a user with email field wrong", async () => {
    const response = await request(server).post("/users").send({
      name: "John",
      email: "john@mail",
    });

    expect(response.status).toBe(400);
  });
});
