var express = require("express");
var router = express.Router();
const pool = require("../data.base"); // caminho do seu data.base.js

/* Rota principal */
router.get("/", function (req, res, next) {
  res.send("ok");
});

/* Rota de teste do MySQL */
router.get("/test-db", async function (req, res, next) {
  try {
    const [rows] = await pool.query("SELECT NOW() AS agora");
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
