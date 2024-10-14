const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {
  authenticateUser,
  authorizeAdmin,
  authenticateToken,
} = require("../middleware/authMiddleware");

router.use(authenticateToken);
router.use(authenticateUser);

// Get all users (Admin Only)
router.get("/", authorizeAdmin, UserController.getAllUsers);

// Get a user by ID
router.get("/:id", UserController.getUserById);

// Create a new user
router.post("/", UserController.createUser);

// Update a user by ID
router.put("/:id", UserController.updateUser);

// Delete a user by ID
router.delete("/:id", UserController.deleteUser);

module.exports = router;
