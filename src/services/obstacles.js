const obstacles = require('../models/obstacles');
const { calculateDistance } = require('./calculateDistance');

//Add Obstacle
const addObstacle = async ({ userId, latitude, longitude, imageURL, type, status, numberOfReports }) => {
    if(!userId || !latitude || !longitude || !imageURL || !type || !status || !numberOfReports) {
        return `All fields are required!`
    }
    return await obstacles.addObstacle({
        userId,
        latitude,
        longitude,
        imageURL,
        type,
        status,
        numberOfReports
    })
};

//Add obstacle image

//Get All Obstacles
const getAllObstacles = async () => {
    return await obstacles.getAllObstacles()
};
const getNearbyObstacles = async (lat, lng) => {
    const allObstacles = await getAllObstacles()
    const nearbyObstacles = allObstacles.filter((obstacle) => {
        return calculateDistance(lat, lng, obstacle.latitude, obstacle.longitude) < 3
    })
    return nearbyObstacles
}
module.exports = {
    addObstacle,
    getAllObstacles,
    getNearbyObstacles
}