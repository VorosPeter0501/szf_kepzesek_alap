const path = require('path');


const Training = require('../models/Training')

exports.createTraining = async (req, res, next) => {
    try {
        const training = await Training.create(req.body);
        res.status(201).json({ success: true, data: training });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
}

exports.getAllTraining = async (req, res, next) => {
    try {
        const trainings = await Training.find();
        res.status(200).json({ success: true, data: trainings });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
}

exports.getTraining = async (req, res, next) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) {
            return res.status(400).json({ success: false, msg: 'Not found' });
        }
        res.status(200).json({ success: true, data: training });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

exports.putPhotoUpload = async (req, res, next) => {
    try {
        console.log(req.files);
        const file = req.files.file
        const training = await Training.findById(req.params.id);
        if (!training) {
            return res.status(400).json({ success: false, msg: 'Not found' });
        }

        if (!req.files) {
            return res.status(400).json({ success: false, msg: 'Please upload a file' });
        }
        if (!file.mimetype.startsWith('image')) {
            return res.status(400).json({ success: false, msg: "Please upload an image file" });
        }

        if (file.size > process.env.MAX_FILE_UPLOAD) {
            return res.status(400).json({ success: false, msg: `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}` });
        }

        file.name = `photo_${training.id}${path.parse(file.name).ext}`
        //console.log(file.name);
        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, msg: `Problem with file upload` });
            }
        })
        await Training.findByIdAndUpdate(req.params.id, { photo: file.name })
        res.status(200).json({
            success: true,
            data: file.name
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }

}