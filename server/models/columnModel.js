const mongoose = require("mongoose")

const columnSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    columns: [
        {
            name: {type: String, required: true},
            type: {type: String, enum: ["Text", "Date"], required: true},
        }
    ]
})


module.exports = mongoose.model("Column", columnSchema)