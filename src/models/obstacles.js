const pool = require('../database/postgres');

//add obstacle
const addObstacle = async ({
    userId,
    latitude,
    longitude,
    imageURL,
    type,
    status,
    numberOfReports
}) => {
    const { rows, rowCount } = await pool.query(
        'INSERT INTO "obstacles" (user_id, latitude, longitude, image_URL, type, status, number_of_reports) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
        [userId, latitude, longitude, imageURL, type, status, numberOfReports])
    if (rowCount) {
        return rows[0]
    }
    return null
};

//increase number of reports by 1
const increaseNumberOfReports = async (id) => {
    const { rows, rowCount } = await pool.query('UPDATE "obstacles" SET number_of_reports = number_of_reports + 1 WHERE id = $1 RETURNING *', [id])
    if (rowCount) {
        return rows[0]
    }
    return null
};

//Get All Obstacles
const getAllObstacles = async () => {
    const { rows, rowCount } = await pool.query('SELECT * FROM "obstacles"')
    if (rowCount) {
        return rows
    }
    return null
};

//Get Obstacles by Type
const getObstaclesByType = async (type) => {
    const { rows, rowCount } = await pool.query('SELECT * FROM "obstacles" WHERE type = $1', [type])
    if (rowCount) {
        return rows
    }
    return null
};

//Get Obstacles by Status
const getObstaclesByStatus = async (status) => {
    const { rows, rowCount } = await pool.query('SELECT * FROM "obstacles" WHERE status = $1', [status])
    if (rowCount) {
        return rows
    }
    return null
};

// Get the top N obstacles by number of reports
const getHighestRoadProblem = async (limit) => {
    const { rows, rowCount } = await pool.query('SELECT * FROM "obstacles" WHERE status = $1 ORDER BY number_of_reports DESC LIMIT $2', ['unsolved', limit]);
 
    if (rowCount) {
        return rows;
    }
 
    return null;
 };
 

module.exports = {
    addObstacle,
    increaseNumberOfReports,
    getAllObstacles,
    getObstaclesByType,
    getObstaclesByStatus,
    getHighestRoadProblem
};