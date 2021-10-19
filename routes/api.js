const router = require("express").Router();
const Workouts = require("../models/workouts");
const path = require("path");

router.get("/", function (req, res){
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get("/api/workouts", function (req, res) {
    Workout.find()
    .then(function(data) {
        console.log(data);
        res.json(data);
    })
    .catch(err => {
        res.status(400).json(err);
    });;
});

router.post("/api/workouts", function (req, res) {
    console.log(req.body);

    Workout.create({})
    .then(function(dbworkout) {
        res.json(dbworkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    Workout.findOneAndUpdate({
        _id: req.params.id
    }, {
        $push: {
            exercises: req.body
        }
    }, {
        new: true
    })
    .then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
     Workout.aggregate([
         {
             $addFields: {
                 totalDuration: {
                     $sum: '$exercises.duration',
                 },
             },
         },
     ])
         .sort({ day: -1 })
         .limit(7)
         .then((dbWorkouts) => {
             res.json(dbWorkouts);
         })
         .catch((err) => {
             res.json(err);
         });
 
 });

module.exports = router;