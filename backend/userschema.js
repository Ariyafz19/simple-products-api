const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userschema = new mongoose.Schema({
    username: {type: String,  required: true, unique: true},
    password: {type: String, required: true}
})

userschema.pre("save", async function() {
    try {
        this.password = await bcrypt.hash(this.password, 12)
    } catch (error) {
        throw error;
    }

})


const User = mongoose.model("User", userschema);

module.exports = User;