const express = require("express")
const {authMiddleware} = require("../middlewares/autMiddleware")
const router = express.Router();
const { register, login, logout } = require("../controllers/authController")

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/user", authMiddleware,(req, res) => {
    res.json({
        user: req.user
    });
})

module.exports = router;