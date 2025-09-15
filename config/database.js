const mysql = require("mysql2/promise");
require("dotenv").config();

const MAX_RETRIES = 10;
const RETRY_DELAY = 3000; // 3 segundos

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
});

async function testConnection(retries = 0) {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Conectado ao MySQL!");
  } catch (err) {
    console.error(
      `❌ Erro ao conectar ao MySQL (tentativa ${retries + 1}):`,
      err.code || err.message
    );
    if (retries < MAX_RETRIES - 1) {
      console.log(`⏳ Tentando novamente em ${RETRY_DELAY / 1000} segundos...`);
      await new Promise((res) => setTimeout(res, RETRY_DELAY));
      return testConnection(retries + 1);
    } else {
      console.error(
        "💥 Não foi possível conectar ao MySQL após várias tentativas."
      );
      process.exit(1);
    }
  }
}

// Testa a conexão ao iniciar
testConnection();

module.exports = pool;
