const mongoose = require("mongoose")

const userTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    token: {
        type: String,
        require: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
},
{
    timestamps:true
}
)
module.exports = mongoose.model("userToken", userTokenSchema)