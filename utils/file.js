const fs = require('fs');
const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) console.log('🔴 ' + err.message);
        else console.log("🟢 Old file Deleted Successfully")
    });
}
module.exports = deleteFile;