const pool = require("../config/database");

async function addUser(req, res) {
  const { jerseyNumber, name, position, age } = req.body;

  if (!name || !position || !age) {
    return res.status(400).json({
      success: false,
      message: "Nome, posição e idade são obrigatórios",
    });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO users (jerseyNumber, name, position, age) VALUES (?, ?, ?, ?)",
      [jerseyNumber || null, name, position, age]
    );

    return res.status(201).json({
      success: true,
      message: "Usuário criado com sucesso",
      user: { id: result.insertId, jerseyNumber, name, position, age },
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao salvar usuário no banco de dados",
    });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { jerseyNumber, name, position, age } = req.body;

  if (!name || !position || !age) {
    return res.status(400).json({
      success: false,
      message: "Nome, posição e idade são obrigatórios",
    });
  }

  try {
    const [result] = await pool.execute(
      "UPDATE users SET jerseyNumber = ?, name = ?, position = ?, age = ? WHERE id = ?",
      [jerseyNumber || null, name, position, age, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Usuário atualizado com sucesso",
      user: { id, jerseyNumber, name, position, age },
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar usuário no banco de dados",
    });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID do usuário é obrigatório",
    });
  }

  try {
    const [result] = await pool.execute("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Usuário deletado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao deletar usuário no banco de dados",
    });
  }
}

async function getAllUsers(req, res) {
  try {
    const [rows] = await pool.execute("SELECT * FROM users");
    const total = rows.length;

    return res.status(200).json({
      success: true,
      total,
      users: rows,
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar usuários no banco de dados",
    });
  }
}

module.exports = { addUser, deleteUser, updateUser, getAllUsers };
