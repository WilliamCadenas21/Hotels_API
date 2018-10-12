const hotel = require('../models/hotel.model.js')
const node_xj = require('xls-to-json-lc')

exports.addAll = (req,res)=>{
    node_xj({
        input: "Hotel_Tourism.xls",  // input xls
        output: "output.json", //output json
        sheet: "Sheet1",  // specific sheetname
        lowerCaseHeaders:true
      }, function(err, result) {
        if(err) {
          console.error(err)
        } else {
          console.log(result)
          //var Hotels = result
        }
    })
}
// Create and Save a new Hotel
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Hotel content can not be empty"
        });
    }

    // Create a Hotel
    const hotel = new Hotel({
        title: req.body.title || "Untitled Hotel", 
        content: req.body.content
    });

    // Save Hotel in the database
    hotel.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all hotels from the database.
exports.findAll = (req, res) => {
    Hotel.find()
    .then(hotel => {
        res.send(hotel);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving hotels."
        });
    });
};

// Find a single hotel with a hotelId
exports.findOne = (req, res) => {
    Hotel.findById(req.params.hotelId)
    .then(hotel => {
        if(!hotel) {
            return res.status(404).send({
                message: "Hotel not found with id " + req.params.hotelId
            });            
        }
        res.send(hotel);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "hotel not found with id " + req.params.hotelId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving hotel with id " + req.params.hotelId
        });
    });
};

// Update a hotel identified by the hotelId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "hotel content can not be empty"
        });
    }

    // Find hotel and update it with the request body
    Hotel.findByIdAndUpdate(req.params.hotelId, {
        title: req.body.title || "Untitled Hotel",
        content: req.body.content
    }, {new: true})
    .then(hotel => {
        if(!hotel) {
            return res.status(404).send({
                message: "hotel not found with id " + req.params.hotelId
            });
        }
        res.send(hotel);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Hotel not found with id " + req.params.hotelId
            });                
        }
        return res.status(500).send({
            message: "Error updating hotel with id " + req.params.hotelId
        });
    });
};

// Delete a hotel with the specified hotelId in the request
exports.delete = (req, res) => {
    Hotel.findByIdAndRemove(req.params.hotelId)
    .then(hotel => {
        if(!hotel) {
            return res.status(404).send({
                message: "Hotel not found with id " + req.params.hotelId
            });
        }
        res.send({message: "Hotel deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Hotel not found with id " + req.params.hotelId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Hotel with id " + req.params.hotelId
        });
    });
};