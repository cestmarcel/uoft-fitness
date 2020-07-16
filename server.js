const mongoose = require('mongoose')
const express = require('express')
var path = require('path');

const PORT = process.env.PORT || 8080

const app = express()

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// for parsing incoming POST data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// for serving all the normal html
app.use(express.static('public'))

// pulling in models
const db = require('./models/Workout');
const { stat } = require('fs');

// HTML routes

app.get("/exercise", async function (req, res) {
    console.log("[GET /api/exercise]");
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
})

app.get("/stats", async function (req, res) {
    console.log("[GET /api/stats");
    res.sendFile(path.join(__dirname + "/public/stats.html"));
})

// API endpoints
app.get("/api/workouts", async function (req, res) {
    console.log("[GET /api/workouts]");
    const workoutList = await db.find({}).populate("exercises");
    res.send(workoutList);
})

app.get("/api/workouts/range", async function (req, res) {
    console.log("[GET /api/workouts/range]");
    const lastWeek = await db.find({}).limit(7);
    res.send(lastWeek);
})

app.post("/api/workouts", async function (req, res) {
    console.log("[POST /api/workouts]");
    let postingWorkout = await db.create(req.body);
    res.send(postingWorkout);
})

app.put("/api/workouts/:id", async function (req, res){
    console.log("[PUT /api/workouts/:id]");
    console.log(req.body);
    let updateWorkout = await db.updateOne({_id: req.params.id}, {$push: {exercises: req.body}});
    res.send({status: true, message: "Successfully updated workout"});
})

app.listen(PORT, function () {
    console.log(`Serving app on: http://localhost:${PORT}`)
})