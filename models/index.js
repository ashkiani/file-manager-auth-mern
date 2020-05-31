const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        unique: false,
        required: true
    },
    last_name: {
        type: String,
        unique: false,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    files: [{
        type: Schema.Types.ObjectId,
        ref: "File",
        required: false
    }]
});

const fileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    shared: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false
        }
        , access: {
            type: Number,
            unique: false,
            required: false
        }
    }]
});



const User = mongoose.model("User", userSchema);
const File = mongoose.model("File", fileSchema);

module.exports = { User, File };