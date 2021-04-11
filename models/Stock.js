const mongoose = require("mongoose");

const StockSchema = mongoose.Schema({
    store_id: {
        type: Number,
        required: true
    },
    drug_name: {
        type: String,
    },
    expiry_date: {
        type: Date,
    },
    quantity: {
        type: Number,
    },
})

module.exports = mongoose.model("Stock", StockSchema);
