const pool = require('../database/postgres')

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
    const { rows, rowCount } = await pool.query('INSERT INTO "obstaclereport" (user_id, latitude, longitude, image_URL, type, status, number_of_reports) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [userId, latitude, longitude, imageURL, type, status, numberOfReports])
    if (rowCount) {
        return rows[0]
    }
    return null
};

//add obstacle image

//Get All Obstacles
const getAllObstacles = async () => {
    const { rows, rowCount } = await pool.query('SELECT * FROM "obstaclereport"')
    if (rowCount) {
        return rows
    }
    return null
};

module.exports = {
    addObstacle,
    getAllObstacles
};