const express = require("express")
const { authMiddleware } = require("../middlewares/authMiddleware")
const router = express.Router();
const { getAccounts, createAccount, updateAccount, deleteAccount } = require("../controllers/accountController")


router.get("/", authMiddleware, getAccounts)
router.post("/", authMiddleware, createAccount)
router.put("/:id", authMiddleware, updateAccount)
router.delete("/:id", authMiddleware, deleteAccount)


module.exports = router;