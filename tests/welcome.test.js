const request = require("supertest");
const { app, server } = require("../server");

describe("GET /", () => {
  it("should return html", async () => {
    const welcomeMessage = await request(app).get("/");
    expect(welcomeMessage.status).toBe(200);
    expect(welcomeMessage.text).toBe(
      "<h1>Welcome to My Jebrin call center!</h1>"
    );
  });
});
