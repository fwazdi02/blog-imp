const mongoose = require("mongoose")
const { Schema } = mongoose

const postSchema = new Schema(
    {
        title: String,
        slug: { type: String, unique: true },
        content: { type: String, default: "" },
        image: { type: Schema.ObjectId, ref: "ObjectFile", default: null },
        images: { type: [{ type: Schema.ObjectId, ref: "ObjectFile", default: null }], default: [] },
        is_deleted: { type: Boolean, default: false },
        created_by: { type: Schema.ObjectId, ref: "User" },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: { createdAt: "created_at", updatedAt: "updated_at", deletedAt: "deleted_at" },
    },
)

postSchema.pre("save", function () {
    this.slug = this.title
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-")
})

const Post = mongoose.model("Post", postSchema)
module.exports = { Post }
