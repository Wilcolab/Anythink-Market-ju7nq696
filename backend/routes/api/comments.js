const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

/**
 * Get all comments
 * @route GET /api/comments
 * @returns {object} - An array of comments
 * @throws {Error} - If there is an internal server error
 */
router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

/**
 * Delete a comment by ID
 * @route DELETE /api/comments/:id
 * @param {string} req.params.id - The ID of the comment to delete
 * @returns {object} - A success message if the comment is deleted successfully
 * @throws {Error} - If the comment is not found or there is an internal server error
 */
router.delete("/:id", async (req, res) => {
        try {
                const comment = await Comment.findByIdAndDelete(req.params.id);
                if (!comment) {
                        return res.status(404).json({ message: "Comment not found" });
                }
                res.json({ message: "Comment deleted successfully" });
        } catch (error) {
                res.status(500).send("Internal Server Error");
        }
});
