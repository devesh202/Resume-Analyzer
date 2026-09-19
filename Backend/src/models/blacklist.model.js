const mongoose = require('mongoose')
const { Schema } = mongoose
const blacklistTokenSchema = new Schema(
    {
        token: {
            type: String,
            required: [true, "Token is required"],
            unique: true
        }
    },
    {
        timestamps: true,
        expires: '1d'
    }
);

const tokenBlacklistModel = mongoose.model("BlacklistTokens", blacklistTokenSchema)

module.exports = tokenBlacklistModel