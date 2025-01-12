const getAllBlogs = async (req, res) => {
    try {
        const blogs = await db.find({}); // Assuming you have a method to retrieve blogs
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error });
    }
};

const getBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await db.findOne({ _id: id }); // Assuming you have a method to find a blog by ID
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blog", error });
    }
};

const createBlog = async (req, res) => {
    const { title, content } = req.body;

    try {
        const newBlog = { title, content, createdAt: Date.now() }; // Add createdAt field
        await db.insert(newBlog); // Save the blog to NeDB
        res.status(201).json(newBlog); // Return the created blog post
    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error });
    }
};

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        await db.update({ _id: id }, { $set: { title, content } });
        res.status(200).json({ message: `Blog updated for ID: ${id}` });
    } catch (error) {
        res.status(500).json({ message: "Error updating blog", error });
    }
};

const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        await db.remove({ _id: id });
        res.status(200).json({ message: `Blog deleted for ID: ${id}` });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog", error });
    }
};

module.exports = {
    getAllBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
};
