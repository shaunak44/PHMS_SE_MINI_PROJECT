const mongoose = require("mongoose");

const HospitalOperatorSchema = mongoose.Schema({
    hospital_id: {
        type: Number,
        required: true
    },
    aadhaar_id: {
        type: Number,
        required: true
    },
})


module.exports = mongoose.model("hospitaloperator", HospitalOperatorSchema);

