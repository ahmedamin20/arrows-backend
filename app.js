require("dotenv").config();
require("./boot/dbConnection");
const path = require('path');
const express = require("express");
const cors = require('cors');
const adminRouter = require('./routes/admins');
const sharedRouter = require('./routes/shared');
const userRouter = require('./routes/user');
const device = require('express-device');
const cron = require('node-cron');

const app = express();

app.use(cors());
app.use(device.capture())
app.use(express.json());
app.use("/backend/public", express.static(path.join('public')));
app.use('/backend/admin', adminRouter);
app.use('/backend/shared', sharedRouter)
app.use('/backend', userRouter);

app.use((err, req, res, next) => {
    console.log("=============== Error ============")
    console.log(err.message || err.error);
    return res.status(err.status || 500).send(err.message || err.error).end();
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🟢 BE Server Started on port : ${PORT} !`));
