const obstacles = require('../models/obstacles');
const { calculateDistance } = require('./calculateDistance');

// Function to check existence of obstacle
const checkObstacleExistence = async (latitude, longitude, type) => {
    const allObstacles = await obstacles.getAllObstacles();

    if(!allObstacles) {
        return null;
    }

    const obstaclesInRange = allObstacles.filter((obstacle) => {
        const distanceInKm = calculateDistance(latitude, longitude, obstacle.latitude, obstacle.longitude);
        const distanceInMeters = distanceInKm * 1000;
 
        return distanceInMeters <= 20 && obstacle.type === type;
    });
 
    if (obstaclesInRange.length > 0) {
        console.log(obstaclesInRange);
        await obstacles.increaseNumberOfReports(obstaclesInRange[0].id);
        return `Obstacle already reported, we will make sure to solve it as soon as possible!`
    };
 
    return null;
 };
 
 // Main function to add obstacle
 const addObstacle = async ({ userId, latitude, longitude, imageURL, type}) => {
    if(!userId || !latitude || !longitude || !imageURL) {
        return `All fields are required!`
    };
 
    if (type){
        type = type.toLowerCase();
    };
    
    if (!type || (type !== 'accident' && type !== 'roadblock' && type !== 'road cracking')) {
        type = 'unknown';
    };
 
    const obstacleExistence = await checkObstacleExistence(latitude, longitude, type);
 
    if (obstacleExistence) {
        return obstacleExistence;
    };
 
    return await obstacles.addObstacle({
        userId,
        latitude,
        longitude,
        imageURL,
        type,
        status: 'unsolved',
        numberOfReports: 1
    });
 };
 

//Get All Obstacles
const getAllObstacles = async () => {
    return await obstacles.getAllObstacles()
};

//Get Nearby Obstacles
const getNearbyObstacles = async (lat, lng) => {
    const allObstacles = await getAllObstacles()
    const nearbyObstacles = allObstacles.filter((obstacle) => {
        return calculateDistance(lat, lng, obstacle.latitude, obstacle.longitude) < 3
    })
    return nearbyObstacles
};

//Get Obstacles by Type
const getObstaclesByType = async (type) => {
    return await obstacles.getObstaclesByType(type)
};

//Get Obstacles by Status
const getObstaclesByStatus = async (status) => {
    return await obstacles.getObstaclesByStatus(status)
};

//Get Obstacles by Number of Reports
const getHighestRoadProblem = async (limit) => {
    return await obstacles.getHighestRoadProblem(limit)
}; 



module.exports = {
    addObstacle,
    getAllObstacles,
    getNearbyObstacles,
    getObstaclesByType,
    getObstaclesByStatus,
    getHighestRoadProblem
}