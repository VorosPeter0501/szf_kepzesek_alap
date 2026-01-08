const Course = require("../models/Course");
// @desc   Get courses
// @route  GET /api/courses
// @route  GET /api/trainings/:trainingId/courses
// @access Public
exports.getCourses = async (req, res, next) => {
    try {
        let query
        if (req.params.trainingId) {
            query = Course.find({ training: req.params.trainingId })
        } else {
            query = Course.find().populate({
                path: 'training',
                select: '-_id name description'
            }
            )
        }
        const courses = await query
        if (courses.length === 0) {
            return res
                .status(404)
                .json({ success: false, msg: `Not found ${req.params.trainingId} id` })
        }
        res
            .status(200)
            .json({ success: true, count: courses.length, data: courses })
    } catch (error) {
        next(error)
    }
}
