require("dotenv").config(); // A .env fájlt olvassa
const express = require("express");
const fileupload = require("express-fileupload");
const trainingsRoutes = require('./routes/trainings.routes')
// const coursesRoutes = require('./routes/courses.routes')

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log(`Database Connected ${database.host}`);
});
const app = express()
app.use(express.json())

app.use(fileupload())

app.use(express.static('public'))

app.use("/api/trainings", trainingsRoutes);
// app.use("/api/courses", coursesRoutes);

app.listen(3000, ()=>{
    console.log('Server started')
})