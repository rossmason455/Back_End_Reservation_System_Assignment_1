const request = require("supertest");
const app = require("../server");
const { sequelize, User, Token } = require("../models");

describe("User / Auth Endpoints", () => {
  let authToken;
  let userId;

  const testUser = {
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
    phone: "1234567890",
    role: "user",
  };

  /* ************************ REGISTER ************************ */
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    userId = res.body.id;
  });

  it("should fail to register with missing fields", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "invalid@example.com" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  /* ************************ LOGIN ************************ */
  it("should login successfully with correct credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    authToken = res.body.token;
  });

  it("should fail login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: "wrongpassword" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid credentials");
  });

  /* ************************ LOGOUT ************************ */
  it("should logout successfully", async () => {
    const res = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Logged out successfully");
  });
});
