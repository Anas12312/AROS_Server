const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Convert latitude and longitude from degrees to radians
    const toRadians = (angle) => (angle * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers

    // Differences in coordinates
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    // Haversine formula
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in kilometers
    const distance = R * c;

    return distance;
}

const distance = calculateDistance(31.34139585281801,  29.85098617469103,  31.3402313105083, 29.850959093539217);
console.log(`Distance: ${distance.toFixed(2)} km`);

export default calculateDistance;