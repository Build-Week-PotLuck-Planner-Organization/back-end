require("dotenv").config();
const supertest = require("supertest")
const server = require("../server")
const db = require("../../data/dbConfig")

let token = ""

beforeEach (async () => {
    await db.seed.run()

    token = await supertest(server)
        .post("/api/auth/login")
        .send({username: "dheart", password: "654321"})
        .then(res => {
            return res.body.token;
        });
})

afterAll(async () => {
    await db.destroy()
})

// USERS

describe ("testing endpoints", () => {
    it("GET /users --returns a list of users", async () => {
        const res = await supertest(server)
            .get("/api/auth/users")
            .set('Authorization', token)

        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body[0].name).toBe("Elizabeth Allen")
    })

    it("GET /users --rejects users without a token", async () => {
        const res = await supertest(server)
            .get("/api/auth/users")
        expect(res.statusCode).toBe(401)
    })


    it("GET /login --allows a user to login", async () => {
        const res = await supertest(server)
            .post("/api/auth/login")
            .send({
                username: "dheart",
                password: "654321"
            })

        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Welcome dheart!")
    })

    it("POST /register returns 201", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send({
            name: "aperezc",
            username: "aperezc",
            password: "12332121",
            email: "aperezc@gmail.com",
            phone: 122-112-1143,
        })
        expect(res.statusCode).toBe(201)
    })
})

//potlucks
describe("potluck integration tests", () => {
    it("GET / --returns a list of potlucks", async () => {
        const res = await supertest(server)
            .get("/api/potlucks")
            .set('Authorization', token)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBe(4)
        expect(res.body[0].potluck_name).toBe("Family Potluck 2021")
    })

    it("GET /:pid --returns a single potluck with given PID", async () => {
        const res = await supertest(server)
            .get("/api/potlucks/3f95d22e-21a9-4ee4-9e9a-b14479b36555")
            .set('Authorization', token)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.potluck_name).toBe("Family Potluck 2021")
    })

    it("POST / --adds a new potluck", async () => {
        const res = await supertest(server)
            .post("/api/potlucks")
            .set('Authorization', token)
            .send({
                potluck_name: "Family Potluck 2022", 
                date: "08-30-2021", 
                location: "123 Sunshine Ave. Charlotte, NC 12312", 
                host_id: "4f95d22e-21a9-4ee4-9e9a-b14479b36555"
            })
        expect(res.statusCode).toBe(201)
    })

    it("PUT /:pid --updates an existing potluck", async () => {
        const res = await supertest(server)
            .put("/api/potlucks/3f95d22e-21a9-4ee4-9e9a-b14479b36555")
            .set('Authorization', token)
            .send({
                potluck_name: "Test Update Potluck",
            })
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.potluck_name).toBe("Test Update Potluck")
    })

    it("PUT /:pid --returns an error if you send an invalid PID", async () => {
        const res = await supertest(server)
            .put("/api/potlucks/3")
            .set('Authorization', token)
            .send({
                name: "Test Update Potluck",
            })
        expect(res.statusCode).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Could not find potluck with the given ID.")
    })
})

//foods
describe("potluck integration tests", () => {
    it("GET /foods --returns a list of foods", async () => {
        const res = await supertest(server)
            .get("/api/foods")
            .set('Authorization', token)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBe(6)
        expect(res.body[0].name).toBe("Apple Pie")
    })

    it("POST /foods --adds a new food", async () => {
        const res = await supertest(server)
            .post("/api/foods")
            .set('Authorization', token)
            .send({
               name: "Doritos", 
            })
        expect(res.statusCode).toBe(201)
    })
})