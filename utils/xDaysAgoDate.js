const getDateXDaysAgo = (numOfDays, date = new Date()) => {
    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(date.getDate() - numOfDays);
    return daysAgo;
}

module.exports = { getDateXDaysAgo };