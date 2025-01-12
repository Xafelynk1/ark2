const approveSelectedUsers = (req, res) => {
    // Logic to approve selected users
    res.json({ message: "Selected users approved" });
};

const deleteSelectedPosts = (req, res) => {
    // Logic to delete selected posts
    res.json({ message: "Selected posts deleted" });
};

module.exports = {
    approveSelectedUsers,
    deleteSelectedPosts,
};
