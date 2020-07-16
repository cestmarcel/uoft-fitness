const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: () => new Date()
        },
        exercises: [
            {
                type: {
                    type: String
                },
                name: {
                    type: String
                },
                duration: {
                    type: Number
                },
                weight: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                sets: {
                    type: Number
                },
                distance: {
                    type: Number
                }
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

workoutSchema.virtual("totalDuration").get(function(){
    let totalDuration = 0;
    this.exercises.forEach(exercise => {
        totalDuration += exercise.duration
    });
    return totalDuration;
})

module.exports = mongoose.model("Workout", workoutSchema);