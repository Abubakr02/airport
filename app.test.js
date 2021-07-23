const airports = require("./airports");
const app = require("./app");
const request = require("supertest");

describe("get test", () => {
    test("does it get all airports", async () => {
        const response = await request(app).get('/airports');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(airports);
    });
    test("does it get correct airport", async () => {
        const randAirport =
            airports[Math.floor(Math.random() * airports.length)];
        const icao = randAirport.icao;
        const response = await request(app).get("/airports/" + icao);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(randAirport);
    });

    test("does it give return error", async () => {
        const response = await request(app).get(
            "/airports/" + "invalid"
        );
        expect(response.status).toBe(404);
    });
});

describe("post test", () => {
    test("create airport", async () => {
        const createdAirport = {
            icao: "00UK",
            iata: "",
            name: "Stanstead",
            city: "Stratford",
            state: "London",
            country: "UK",
            elevation: 1000,
            lat: 69.94919968,
            lon: -141.695999146,
            tz: "Britain",
        };
        const response = await request(app).post("/airports").send(createdAirport);
        expect(response.status).toBe(201);
        const changeAirport = airports.find(
            (airport) => airport.icao === "00CRM"
        );
        expect(changeAirport).toEqual(createdAirport);
    });
    test("create error", async () => {
        const response = await request(app).post("/airports").send(airports[0]);
        expect(response.status).toBe(409);
    });
});

describe("put tests", () => {
    test("change airport", async () => {
        const createdAirport = {
            icao: "00UK",
            iata: "",
            name: "Stanstead",
            city: "Stratford",
            state: "London",
            country: "UK",
            elevation: 1000,
            lat: 69.94919968,
            lon: -141.695999146,
            tz: "Britain",
        };
        const icao = airports[0].icao;
        const response = await request(app)
            .put("/airports/" + icao)
            .send(createdAirport);
        expect(response.status).toBe(200);
        createdAirport.icao = icao;
        const changeAirport = airports.find((airport) => airport.icao === icao);
        expect(changeAirport).toEqual(createdAirport);
    });
    test("put error", async () => {
        const createdAirport = {
            icao: "00UK",
            iata: "",
            name: "Stanstead",
            city: "Stratford",
            state: "London",
            country: "UK",
            elevation: 1000,
            lat: 69.94919968,
            lon: -141.695999146,
            tz: "Britain",
        };
        const icao = "waffle";
        const response = await request(app)
            .put("/airports/" + icao)
            .send(createdAirport);
        expect(response.status).toBe(404);
    });
});

describe("delete tests", () => {
    test("delete airport", async () => {
        const randAirport =
            airports[Math.floor(Math.random() * airports.length)];
        const icao = randAirport.icao;
        const response = await request(app).delete("/airports/" + icao);
        expect(response.status).toBe(200);
        const airportIndex = airports.findIndex(
            (airport) => airport.icao === icao
        );
        expect(airportIndex).toBe(-1);
    });
    test("delete error", async () => {
        const icao = "invalid1";
        const beforeLength = airports.length;
        const response = await request(app).delete("/airports/" + icao);
        expect(response.status).toBe(404);
        expect(airports.length).toBe(beforeLength);
    });

});