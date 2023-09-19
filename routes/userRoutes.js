const express = require("express");
const { loginController, registerController, authController } = require("../controller/userCtrl");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

// login
router.post("/login", loginController);
// register
router.post("/register", registerController );

router.post('/getUserData', authMiddleware, authController)

module.exports = router;
