const axios = require("axios");
const API_URL = "https://get.geojs.io/v1/ip/country/full/";

const getCountryForIp = async (ip) => {
    try {
        const response = await axios.get(API_URL + ip);
        const country = response.data
        return country;
    } catch (error) {
        console.error(error)
    }
}

module.exports = { getCountryForIp };