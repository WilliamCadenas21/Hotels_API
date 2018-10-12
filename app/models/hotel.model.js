const mongoose = require('mongoose')

const HotelSchema = mongoose.Schema({   
 	rooms: Number,
 	hotel_name: String,
 	address: String,
 	state: String,
 	phone: String,
 	fax: String,
 	email_id: String,
 	website: String,
 	type: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Hotel', HotelSchema)