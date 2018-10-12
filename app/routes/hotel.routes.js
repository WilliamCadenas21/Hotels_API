module.exports = (app) => {
    const hotel = require('../controllers/hotel.controller.js');

    // Create a new hotel
    app.post('/hotel', hotel.create);

    // Retrieve all hotel
    app.get('/hotel', hotel.findAll);

    // Retrieve a single hotel with hotelId
    app.get('/hotel/:hotelId', hotel.findOne);

    // Update a hotel with hotelId
    app.put('/hotel/:hotelId', hotel.update);

    // Delete a hotel with hotelId
    app.delete('/hotel/:hotelId', hotel.delete);

    app.get('/configdb', hotel.addAll)
}