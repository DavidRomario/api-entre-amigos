const pool = require("../config/database");

async function addMatch(req, res) {
  const {
    match_date,
    opponent_name,
    goals_entre_amigos,
    goals_opponent,
    location,
  } = req.body;

  if (
    !match_date ||
    !opponent_name ||
    goals_entre_amigos === undefined ||
    goals_opponent === undefined ||
    !location
  ) {
    return res.status(400).json({
      success: false,
      message: "Todos os campos são obrigatórios",
    });
  }

  try {
    const payloadDate = match_date.split("T")[0];

    const [result] = await pool.execute(
      "INSERT INTO matches (match_date, opponent_name, goals_entre_amigos, goals_opponent, location) VALUES (?, ?, ?, ?, ?)",
      [payloadDate, opponent_name, goals_entre_amigos, goals_opponent, location]
    );

    return res.status(201).json({
      success: true,
      message: "Partida registrada com sucesso",
      match: {
        id: result.insertId,
        match_date,
        opponent_name,
        goals_entre_amigos,
        goals_opponent,
        location,
      },
    });
  } catch (error) {
    console.error("Erro ao registrar partida:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao salvar partida no banco de dados",
    });
  }
}

async function editMatch(req, res) {
  const { id } = req.params;
  const {
    match_date,
    opponent_name,
    goals_entre_amigos,
    goals_opponent,
    location,
  } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID da partida é obrigatório",
    });
  }

  try {
    const [result] = await pool.execute(
      `UPDATE matches 
       SET match_date = ?, opponent_name = ?, goals_entre_amigos = ?, goals_opponent = ?, location = ? 
       WHERE id = ?`,
      [
        match_date,
        opponent_name,
        goals_entre_amigos,
        goals_opponent,
        location,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Partida não encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Partida atualizada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao atualizar partida:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar partida no banco de dados",
    });
  }
}

async function deleteMatch(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID da partida é obrigatório",
    });
  }

  try {
    const [result] = await pool.execute("DELETE FROM matches WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Partida não encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Partida deletada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar partida:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao deletar partida no banco de dados",
    });
  }
}

async function getAllMatches(req, res) {
  try {
    const [matches] = await pool.execute("SELECT * FROM matches");

    const formatted = matches.map((m) => ({
      ...m,
      match_date: m.match_date.toISOString().split("T")[0],
    }));

    return res.status(200).json({
      success: true,
      total: formatted.length,
      matches: formatted,
    });
  } catch (error) {
    console.error("Erro ao buscar partidas:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar partidas no banco de dados",
    });
  }
}

module.exports = { addMatch, editMatch, deleteMatch, getAllMatches };
