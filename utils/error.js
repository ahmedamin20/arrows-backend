module.exports = (error, msg, status) => {
    console.error(error);
    let err = new Error(msg);
    err.status = status;
    return err;
}