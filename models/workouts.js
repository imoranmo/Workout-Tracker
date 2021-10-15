const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema ({

    date: {
        type: Date,
        default: Date.now
      },
    exercise: [{
        type: {
            type: String,
            required: "Please enter type of exercise"
        },
        name: {
            type: String,
            required: "Please enter exercise name"
        },
        distance: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        sets: {
            type: Number,
        },
        reps: {
            type: Number,
        },
        duration: {
            type: Number,
        }
    }]

});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;