const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersControllers");

router.post("/add", userController.addUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);
router.get("/", userController.getAllUsers);

module.exports = router;
