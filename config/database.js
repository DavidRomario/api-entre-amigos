const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "entreamigos",
  waitForConnections: true,
  connectionLimit: 10,
});

(async () => {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("Conectado ao MySQL!");
  } catch (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  }
})();

module.exports = pool;
