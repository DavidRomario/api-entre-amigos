const tokenJwt = require("../helpers/token");

async function loginAdmin(req, res) {
  const { user, password } = req.body;

  try {
    const adminUser = process.env.ADMIN_USER;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (user === adminUser && password === adminPassword) {
      const token = await tokenJwt.create({ user: adminUser, role: "admin" });

      return res.status(200).json({
        success: true,
        message: "Login realizado com sucesso!",
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Usuário ou senha incorretos.",
      });
    }
  } catch (error) {
    console.error("Erro no login admin:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
}

module.exports = {
  loginAdmin,
};
