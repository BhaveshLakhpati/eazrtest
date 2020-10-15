const mongoose = require("mongoose");
const UserSchema = require("../models/user.model");

module.exports = {
    connect: async() => {
        await mongoose.connect("mongodb://localhost:27017/eazrtest", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}