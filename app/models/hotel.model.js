const mongoose = require('mongoose')

const HotelSchema = mongoose.Schema({   
 	rooms: String,
 	hotel_name: String, 
    address : String,
    state : String,
    phone : String,
    fax : String,
    email_id : String,
    website : String,
    type : String
})

module.exports = mongoose.model('Hotel', HotelSchema)