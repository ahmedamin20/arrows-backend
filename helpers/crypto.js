const crypto = require("crypto");

const ALGORITHM = "aes-256-cbc";
const IV = Buffer.from(process.env.IV, 'hex');
const SECRET = Buffer.from(process.env.SECRET, 'hex');
const INPUT_ENCODING = 'utf-8';
const OUTPUT_ENCODING = 'hex';

const encryptMessage = (message) => {
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET, IV);
    let encryptedData = cipher.update(message, INPUT_ENCODING, OUTPUT_ENCODING);
    encryptedData += cipher.final(OUTPUT_ENCODING);
    return encryptedData
}

const decryptMessage = (message) => {
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET, IV);
    let decryptedData = decipher.update(message, OUTPUT_ENCODING, INPUT_ENCODING);
    decryptedData += decipher.final(INPUT_ENCODING)
    return decryptedData;
}

const encryptObjectFields = (dataObj) => {
    for (let key of Object.keys(dataObj)) {
        dataObj[key] = encryptMessage(dataObj[key])
    }
    return dataObj
}

const decryptObjectFields = (dataObj) => {
    for (let key of Object.keys(dataObj)) {
        dataObj[key] = decryptMessage(dataObj[key])
    }
    return dataObj
}

module.exports = { encryptMessage, decryptMessage, encryptObjectFields, decryptObjectFields };