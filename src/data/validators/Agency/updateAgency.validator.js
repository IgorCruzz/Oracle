import * as Yup from 'yup';

export const updateAgencyValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id: Yup.string().required(),
    });

    const SchemaBody = Yup.object().shape({
      name: Yup.string()
        .max(255, 'O nome precisa ter no máximo 255 caracteres')
        .required(),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res.status(400).json({
      error: 'Validation error',
      messages: e.errors,
    });
  }
};
