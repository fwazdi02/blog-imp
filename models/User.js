const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { Schema } = mongoose

const userSchema = new Schema(
    {
        name: { type: String, min: 3 },
        email: { type: String, unique: true },
        password: { type: String },
        avatar: { type: Schema.ObjectId, ref: "ObjectFile" },
        is_active: { type: Boolean, default: true },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    },
)

userSchema.methods.validatePassword = async (password) => {
    const hash_password = await bcrypt.hash(password, process.env.APP_SALT_PASSWORD)
    return this.password === hash_password
}

userSchema.methods.setPassword = async (password) => {
    const hash_password = await bcrypt.hash(password, process.env.APP_SALT_PASSWORD)
    this.password = hash_password
}

const hashPassword = async (password) => {
    const hash_password = await bcrypt.hash(password, process.env.APP_SALT_PASSWORD)
    return hash_password
}

const User = mongoose.model("User", userSchema)
module.exports = { User, hashPassword }
