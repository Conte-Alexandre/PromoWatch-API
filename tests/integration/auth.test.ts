import request from "supertest";
import createApp from "../../src/api/app";
import prisma from "../../src/api/config/prisma";
import {
  createFakeUser,
  createWrongCredentials,
} from "../fixtures/user.fixture";
const app = createApp();
describe("Auth Integration Tests", () => {
  describe("POST /auth/register", () => {
    test("should register a new user", async () => {
      const newUser = createFakeUser();

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(newUser);
      expect(response.status).toBe(201);
      const user = await prisma.user.findUnique({
        where: {
          email: newUser.email,
        },
      });
      expect(user).toBeTruthy();
      expect(user?.password).not.toBe(newUser.password);
    });
    test("should fail with duplicate email", async () => {
      const user1 = createFakeUser();

      await request(app).post("/api/v1/auth/register").send(user1);
      const response2 = await request(app)
        .post("/api/v1/auth/register")
        .send(user1);
      expect(response2.status).toBe(409);
    });
  });
  describe("POST /auth/login", () => {
    test("should login with valid credentials", async () => {
      const user = createFakeUser();
      await request(app).post("/api/v1/auth/register").send(user);
      const loginRespoonse = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: user.email,
          password: user.password,
        });
      expect(loginRespoonse.status).toBe(200);
      expect(loginRespoonse.body.accessToken).toBeTruthy();
    });
    test("should fail with wrong credentials", async () => {
      const user = createFakeUser();
      const wrongUser = createWrongCredentials();
      await request(app).post("/api/v1/auth/register").send(user);
      const loginRespoonse = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: wrongUser.email,
          password: wrongUser.password,
        });
      expect(loginRespoonse.status).toBe(401);
    });
  });
});
