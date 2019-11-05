const express = require("express");

const User = require("../controllers/userController");

const authMiddleware = require("../../middleware/auth");

const router = express.Router();

router.post("/register", User.user_register);

router.post("/login", User.user_login);

router.get("/profile", authMiddleware, User.user_profile);

router.put("/profile/:id", authMiddleware, User.user_update);

router.get("/profile/:id", User.user_search_profile);

router.get("/authenticateUser/:token", User.user_authenticate_email);

router.get("/isUser", authMiddleware, User.is_user);

module.exports = router;
