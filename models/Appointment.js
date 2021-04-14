const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
    doctor_id: {
        type: Number,
    },
    aadhaar_id: {
        type: Number,
    },
    slot:{
        type: String,
    },
    status:{
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("Appointment", AppointmentSchema);