const request = require("supertest");
const app = require("../index");

describe("Auth", () => {
  it("rejects signup with short password", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({ email: "t@t.com", password: "short" });
    expect(res.status).toBe(400);
  });

  it("signs up and logs in", async () => {
    const email = `test-${Date.now()}@t.com`;
    await request(app)
      .post("/auth/signup")
      .send({ email, password: "longenough" });
    const res = await request(app)
      .post("/auth/login")
      .send({ email, password: "longenough" });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
  });

  it("rejects wrong password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "never@t.com", password: "wrong" });
    expect(res.status).toBe(401);
  });
});
