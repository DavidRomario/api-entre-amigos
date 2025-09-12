const express = require("express");
const router = express.Router();
const matchesController = require("../controllers/matchesController");

router.post("/add", matchesController.addMatch);
router.put("/edit/:id", matchesController.editMatch);
router.delete("/:id", matchesController.deleteMatch);
router.get("/all", matchesController.getAllMatches);

module.exports = router;
