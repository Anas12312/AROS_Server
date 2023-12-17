const express = require('express')
const { addObstacle, getAllObstacles, getNearbyObstacles, getObstaclesByStatus, getObstaclesByType, getHighestRoadProblem } = require('../services/obstacles')
const auth = require('../middleware/auth'); 

const router = new express.Router

//Add Obstacle
router.post('/obstacles', async (req, res) => {
    const payload = {
        userId: req.header('userId'),
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        imageURL: req.body.imageURL,
        type: req.body.type,
    };
    const obstacle = await addObstacle(payload);

    if(!obstacle) {
        return res.status(400).send({
            message: 'Adding obstacle to database failed!'
        })
    };

    if(obstacle === 'Obstacle already reported, we will make sure to solve it as soon as possible!') {
        return res.status(400).send({
            message: obstacle
        })
    };

    return res.send(obstacle)
});

//Get All Obstacles
router.get('/obstacles', auth, async (req, res) => {
    if (!req.user) {
        return res.status(401).send({
            message: 'You are not logged in!'
        })
    };

    if (req.user.role !== 'admin') {
        return res.status(403).send({
            message: 'You are not authorized to access this resource'
        })
    };

    const obstacles = await getAllObstacles();
 
    if(!obstacles) {
        return res.status(400).send({
            message: 'Obstacles not found!'
        })
    };

    return res.send(obstacles)
});

//Get Nearby Obstacles
router.get('/NearbyObstacles', async (req, res) => {
    const lat = req.query.lat
    const lng = req.query.lng
    if(!lat || !lng) {
        return res.status(400).send({
            message: "Latitude and Longitude are required"
        })
    }
    const obstacles = await getNearbyObstacles(lat, lng);

    if(!obstacles) {
        return res.status(400).send({
            message: 'Obstacles not found!'
        })
    };

    return res.send(obstacles)
});

//Get All Obstacles By Type
router.get('/obstaclesByType', auth, async (req, res) => {
    if (!req.user) {
        return res.status(401).send({
            message: 'You are not logged in!'
        })
    };

    if (req.user.role !== 'admin') {
        return res.status(403).send({
            message: 'You are not authorized to access this resource'
        })
    };

    const type = req.query.type;

    if(!type) {
        return res.status(400).send({
            message: "Type is required"
        })
    };

    const obstacles = await getObstaclesByType(type);

    if(!obstacles) {
        return res.status(400).send({
            message: 'Obstacles not found!'
        })
    };

    return res.send(obstacles)
});


//Get All Obstacles By Status
router.get('/obstaclesByStatus', auth, async (req, res) => {
    if (!req.user) {
        return res.status(401).send({
            message: 'You are not logged in!'
        })
    };

    if (req.user.role !== 'admin') {
        return res.status(403).send({
            message: 'You are not authorized to access this resource'
        })
    };

    const status = req.query.status;

    if(!status) {
        return res.status(400).send({
            message: "Status is required"
        })
    };

    const obstacles = await getObstaclesByStatus(status);

    if(!obstacles) {
        return res.status(400).send({
            message: 'Obstacles not found!'
        })
    };

    return res.send(obstacles)
});

//Get highest number of reports obstacles
router.get('/highestRoadProblem', auth, async (req, res) => {
    if (!req.user) {
        return res.status(401).send({
            message: 'You are not logged in!'
        })
    };

    if (req.user.role !== 'admin') {
        return res.status(403).send({
            message: 'You are not authorized to access this resource'
        })
    };

    const limit = req.query.limit;

    const obstacles = await getHighestRoadProblem(limit);

    if (!obstacles) {
        return res.status(400).send({
            message: 'Obstacles not found!'
        });
    }

    return res.send(obstacles);
});

module.exports = router