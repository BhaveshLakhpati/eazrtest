const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    lastLoginTime: { type: Date }
});

module.exports = mongoose.model("Users", UserSchema);