const mongoose = require("mongoose");

const HospitalSchema = mongoose.Schema({
    hospital_id: {
        type: Number,
        required: true
    },
    name:{
        type: String,
    },
    no_of_beds: {
        type: Number,
    },
    phone_number:{
        type: [Number],
    },
    address: {
        type: String,
    },
    type:{
        type: String,
    },
})

module.exports = mongoose.model("hospital", HospitalSchema);
