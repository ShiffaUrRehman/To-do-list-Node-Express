const yup = require("yup");

const itemSchema = yup.object({
  description: yup.string().required().max(1024),
  priority: yup.number().oneOf([1, 2, 3]),
});

const updateItemSchema = yup.object({
  description: yup.string().max(1024),
  priority: yup.number().oneOf([1, 2, 3]), // 1 => high, 2 => medium, 3 => low
});

const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { strict: true });
    return next();
  } catch (err) {
    return res.status(400).send({ type: err.name, message: err.message });
  }
};

module.exports.validateBody = validateBody;
module.exports.itemSchema = itemSchema;
module.exports.updateItemSchema = updateItemSchema;
