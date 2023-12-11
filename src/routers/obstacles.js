const express = require('express')
const { addObstacle, getAllObstacles } = require('../services/obstacles')
const auth = require('../middleware/auth'); 

const router = new express.Router

//Add Obstacle
router.post('/addObstacle', async (req, res) => {
    const payload = {
        userId: req.body.userId,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        imageURL: req.body.imageURL,
        type: req.body.type,
        status: req.body.status,
        numberOfReports: req.body.numberOfReports,
    };
    const obstacle = await addObstacle(payload);

    if(!obstacle) {
        return res.status(400).send({
            message: 'Adding obstacle to database failed!'
        })
    };

    return res.send(obstacle)
});

//upload obstacle image


//Get All Obstacles
router.get('/getAllObstacles', auth, async (req, res) => {
    const obstacles = await getAllObstacles();

    if(!obstacles) {
        return res.status(400).send({
            message: 'Obstacles not found!'
        })
    };

    return res.send(obstacles)
});


module.exports = router