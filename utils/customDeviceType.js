const deviceMapping = [
    {
        deviceType: 'desktop',
        mapping: 'Desktop/Laptop'
    },
    {
        deviceType: 'tv',
        mapping: 'TV'
    },
    {
        deviceType: 'tablet',
        mapping: 'Tablet'
    },
    {
        deviceType: 'phone',
        mapping: 'Phone'
    },
    {
        deviceType: 'bot or car',
        mapping: 'Car/Bot'
    },
]
const getDeviceType = (deviceType) => deviceMapping.find(device => device.deviceType == deviceType).mapping;

module.exports = getDeviceType;
