const mandatoryFields = (required) => (
  (req, res, next) => {
    required.map((field) => {
      if (!req.body[field]) {
        res.status(400).json({
          code: 400,
          message: `campo "${field}" não informado.`,
        });
      }
    });

    next();
  }
);

module.exports = mandatoryFields;
