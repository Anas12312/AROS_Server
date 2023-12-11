const obstacles = require('../models/obstacles')

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

module.exports = {
    addObstacle,
    getAllObstacles
}