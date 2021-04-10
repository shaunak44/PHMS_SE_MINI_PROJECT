const mongoose = require("mongoose");

const PharmacySchema = mongoose.Schema({
    store_id: {
        type: Number,
        required: true
    },
    opening_time:{
        type: String,
    },
    name: {
        type: String,
    },
    closing_time:{
        type: String,
    },
    address: {
        type: String,
    },
    phone_number:{
        type: [Number],
    },
})

module.exports = mongoose.model("pharmacy", PharmacySchema);
