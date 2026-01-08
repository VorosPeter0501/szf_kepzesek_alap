const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a course title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    weeks: {
        type: String,
        required: [true, 'Please add a number of weeks']
    },
    price: {
        type: Number,
        default: 0.0
    },
    minimumSkill: {
        type: String,
        required: [true, 'Please add a minimum skill'],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    training: {
        type: Number,
        ref: 'Training',
        required: true
    }
})
module.exports = mongoose.model("Course", CourseSchema, "courses");
