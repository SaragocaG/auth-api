const jwt = require('jsonwebtoken');

const hasScope = (expectedScope) => (
  (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(400).json({
        code: 400,
        message: `token de acesso não informado.`,
      });
    }
    try {
      const decoded = jwt.decode(
        token.replace('Bearer ', ''),
        process.env.AUTH_SECRET,
      ) || {};
      const scopes = decoded.scopes || [];
      if (scopes.includes(expectedScope)) {
        next();
      } else {
        res.status(401).json({
          code: 401,
          message: `você não tem acesso a esse recurso.`,
        });
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({
        code: 500,
        message: err,
      });
    }
  }
);

module.exports = hasScope;
