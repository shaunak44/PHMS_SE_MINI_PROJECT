const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema({
    doctor_id: {
        type: Number,
    },
    aadhaar_id: {
        type: Number,
    },
    hospital_id: {
        type: Number,
    },
    specialization: {
        type: String,
    },
})

module.exports = mongoose.model("Doctor", DoctorSchema);