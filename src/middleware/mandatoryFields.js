const mandatoryFields = (required) => (
  (req, res, next) => {
    const missingFields = [];
    required.map((field) => (req.body[field] ? true : missingFields.push(field)));
    if (missingFields.length > 0) {
      res.status(400).json({
        code: 400,
        message: `campo(s) faltante(s): [${missingFields.join(', ')}].`,
      });
    }

    next();
  }
);

module.exports = mandatoryFields;
