const express = require('express');
const airports = require('./airports');

const app = express();

app.get('/airports.js', (req, res) => {
    res.json(airports);
});

app.get("/airports/:icao", (req, res) => {
    const airport = airports.find((ap) => ap.icao === req.params.icao);
    if (!airport) {
        res.sendStatus(404);
    } else {
        res.json(airport);
    }
});

app.post("/airports", (req, res) => {
    const icaoToAdd = req.body.icao;
    const indexOfIcaoAirport = airports.findIndex(
        (airport) => airport.icao === icaoToAdd
    );
    if (indexOfIcaoAirport === -1) {
        airports.push(req.body);
        res.sendStatus(201);
    } else {
        res.sendStatus(409);
    }
});

app.put("/airports/:icao", (req, res) => {
    const replaceAirport = airports.findIndex(
        (airport) => airport.icao === req.params.icao
    );
    if (replaceAirport !== -1) {
        const createdAirport = req.body;
        newAirport.icao = req.params.icao;
        airports[replaceAirport] = createdAirport;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.delete("/airports/:icao", (req, res) => {
    const deleteAirport = airports.findIndex(
        (airport) => airport.icao === req.params.icao
    );
    if (deleteAirport !== -1) {
        airports.splice(deleteAirport, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

module.exports = app;