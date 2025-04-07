export const validationMiddelWare = (validatetor) => (req, res, next) => {
  const { error } = validatetor.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({ message: errorMessage });
  }

  next();
};
