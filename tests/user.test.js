const { app } = require("../server");
const { sequelize, User } = require("../database/db");
const request = require("supertest");
const seed = require("../database/seedFn");

describe("Login Route missing username", () => {
  it("should respond with 400 if username is missing", async () => {
    const response = await request(app)
      .post("/user/login")
      .send({ password: "testing123", employee_number: "12345" });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Please enter username!");
  });
});

describe("Login Route missing password", () => {
  it("should respond with 400 if password is missing", async () => {
    const response = await request(app)
      .post("/user/login")
      .send({ username: "testUser", employee_number: "12345" });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Please enter password!");
  });
});

describe("Register Route", () => {
  it("should respond with 400 if employeeId is missing", async () => {
    const response = await request(app).post("/user/register").send({
      username: "tUser",
      password: "testUser123",
      email: "mytest@jebrin.com",
      firstname: "test",
      lastname: "lastnameTest",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Please enter an employeeId");
  });
});
