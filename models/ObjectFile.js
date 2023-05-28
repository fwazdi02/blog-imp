const mongoose = require("mongoose")
const { Schema } = mongoose

const ObjectFileSchema = new Schema(
    {
        name: String,
        base64data: String,
        extention: String,
        description: { type: String, default: "" },
        uploaded_by: { type: Schema.ObjectId, ref: "User" },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    },
)

const ObjectFile = mongoose.model("ObjectFile", ObjectFileSchema)
module.exports = { ObjectFile }
