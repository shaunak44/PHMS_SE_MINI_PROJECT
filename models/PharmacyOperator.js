const mongoose = require("mongoose");

const PharmacyOperatorSchema = mongoose.Schema({
    store_id: {
        type: Number,
        required: true
    },
    aadhaar_id: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model("pharmacyoperator", PharmacyOperatorSchema);