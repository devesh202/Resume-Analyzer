const mongoose = require('mongoose')
const { Schema } = mongoose
//blacklisting means not giving tokens again to user if it expires or logout
// best is to use redis for this:
// redis store data for short period of time and provides fast access
const blacklistTokenSchema = new Schema(
    {
        token: {
            type: String,
            required: [true, "Token is required"],
            unique: true
        }
    },
    {
        timestamps: true
    }
);

const tokenBlacklistModel = mongoose.model("BlacklistTokens", blacklistTokenSchema)

module.exports = tokenBlacklistModel