// routes/index.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware");
const firebaseAuthController = require("../controllers/firebase-auth-controller.ts");

const UserController = require("../controllers/user-controller.ts");

// Auth routes
router.post("/api/register", firebaseAuthController.registerUser);
router.post("/api/login", firebaseAuthController.loginUser);
router.post("/api/logout", firebaseAuthController.logoutUser);
router.post("/api/reset-password", firebaseAuthController.resetPassword);


// User profile routes
/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     responses:
 *       200:
 *         description: User profile
 */
router.get("/fetch-user-data", verifyToken, UserController.getUserProfileHandler);
router.post(
  "/update-user-data",
  verifyToken,
  UserController.updateUserProfileHandler
);

module.exports = router;
