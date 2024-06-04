const mongoose = require('mongoose');
// const pages = require('../pages');
const page = require('../models/page');


require('dotenv').config({ path: './env' });

const dbConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    heartbeatFrequencyMS: 5000,
    serverSelectionTimeoutMS: 5000
}

const db = mongoose.connection;

db.on('disconnected', () => console.log('🔴 DB disconnected !'));
db.on('open', () => console.log('🟢 DB Connected !'));
db.on('reconnected', () => console.log('🟢 DB Reconnected !'));

const connectWithRetry = () => {
    mongoose.connect(process.env.DB_URL, dbConnectionOptions)
        .catch(err => {
            console.error(`🔴 DB Catch Error : ${err.message}`);
            setTimeout(() => connectWithRetry(), 5000);
        });

}
connectWithRetry();

db.once("connected", () => {
    mongoose.connection.db.listCollections().toArray(function (err, collectionNames) {
        if (err) {
            console.log(err);
            return;
        }
        // pages.forEach(p => {
        //     page.findOne({
        //         name: p.name
        //     }).then(async (x) => {
        //         if (x) console.log(`Page ${p.name} Already exist`)
        //         else {
        //             let newPage = new page();
        //             newPage._id=mongoose.Types.ObjectId(p._id.$oid);
        //             newPage.name = p.name;
        //             newPage.code = p.code;
        //             newPage.path = p.path;
        //             newPage.icon = p.icon;
        //             newPage.class = p.class;
        //             newPage.order = p.order;
        //             await newPage.save();
        //         }
        //     })
        // });
    });
})


