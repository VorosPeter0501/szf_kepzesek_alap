const mongoose = require("mongoose");
const TrainingSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters!"],
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        unique: true,
        trim: true,
        maxlength: [500, "Description can not be more than 500 characters!"],
    },
    website: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    Rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must can not be more than 10']
    },
    totalCost: Number,
    photo: {
        type: String,
        default: "no-photo.jpg",
    },
    housing: {
        type: Boolean,
        default: false
    },
    careers: {
        // Array of strings
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Training", TrainingSchema, "trainings");
