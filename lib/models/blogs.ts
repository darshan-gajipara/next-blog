import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        // user_id:{type:mongoose.Schema.Types.ObjectId,require: true,ref: "Users"},
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: String, required: true },
    },
    {timestamps:true}
)

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;