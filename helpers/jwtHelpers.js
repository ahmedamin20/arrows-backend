const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
const generateAccessTokenMobility = (payload)=> jwt.sign(payload,process.env.MOBILITY_ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
const generatePRIDTokenMobility = (payload)=> jwt.sign(payload,process.env.MOBILITY_ID_TOKEN_PR_SECRET,{expiresIn:'1h'});
const generateAuthIDTokenMobility = (payload)=> jwt.sign(payload,process.env.MOBILITY_ID_TOKEN_AUTH_SECRET,{expiresIn:'1h'});

const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (token == null) return res.status(401).end();
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return res.status(401).end();
        if (payload) {
            req.userID = payload.userID;
            next();
        } else return res.status(401).end();
    })
}

const verifyMobilityAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (token == null) return res.status(200).json({
        Message:  "Not Authorized",
        StatusCode: "-100" 
        }).end();
    jwt.verify(token, process.env.MOBILITY_ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return res.status(200).json({
            Message: "Invalid token",
            StatusCode: "-101"
            }).end();
        if (payload) {
            req.userID = payload.userID;
            next();
        } else return res.status(200).json({
            Message: "Invalid username or password",
            StatusCode: "-102"
            }).end();
    })
}

module.exports = { generateAccessToken, verifyAccessToken ,verifyMobilityAccessToken,generateAccessTokenMobility, generatePRIDTokenMobility, generateAuthIDTokenMobility};